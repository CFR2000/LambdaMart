import os
import configparser
import logging

from ariadne import (
    QueryType,
    MutationType,
    gql,
    make_executable_schema,
)
from ariadne.asgi import GraphQL

from redis import Redis

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware

from gql import Client, gql as gql_client
from gql.transport.aiohttp import AIOHTTPTransport


# Load configuration from config.ini
config = configparser.ConfigParser()
config.read("/app/config.ini")

logger = logging.getLogger(__name__)

# Replace hardcoded Redis server and port values with values from config.ini
redis_client = Redis(
    host=config.get("REDIS", "HOST"), port=config.get("REDIS", "PORT"), db=0
)

query = QueryType()
mutation = MutationType()

type_defs = gql(
    """
    type InventoryItem {
        id: ID!
        stockLevel: Int!
        price: Float!
    }

    type Vendor {
        title: String!
        description: String!
        icon: String!
        inventory: [InventoryItem!]!
    }

    enum PurchaseResult {
        SUCCESS
        INSUFFICIENT_STOCK
        ITEM_NOT_FOUND
    }

    type Query {
        vendor: Vendor!
        item(id: ID!): InventoryItem
    }

    type Mutation {
        purchase(id: ID!, quantity: Int!): PurchaseResult!
    }
"""
)


@query.field("vendor")
def resolve_vendor(*_):
    inventory = []
    for key in redis_client.keys():
        item_data = redis_client.hgetall(key)
        if item_data:
            inventory.append({k.decode(): v.decode() for k, v in item_data.items()})
        else:
            logger.error(f"Invalid data for key: {key}")

    vendor = {
        "title": "Meaty Pythons",
        "description": "We sell the best limbless reptilian meat in town!",
        "icon": "http://localhost:8082/static/python.png",
        "inventory": inventory,
    }

    return vendor


@query.field("item")
def resolve_item(*_, id):
    item_data = redis_client.hgetall(id)
    if item_data:
        item_data = {k.decode(): v.decode() for k, v in item_data.items()}
        item_data["stockLevel"] = int(item_data["stockLevel"])
        item_data["price"] = float(item_data["price"])
        return item_data
    return None


@mutation.field("purchase")
def resolve_purchase(*_, id, quantity):
    item_data = redis_client.hgetall(id)
    if item_data:
        item_data = {k.decode(): v.decode() for k, v in item_data.items()}
        if int(item_data["stockLevel"]) < quantity:
            return "INSUFFICIENT_STOCK"
        else:
            item_data["stockLevel"] = int(item_data["stockLevel"]) - quantity
            redis_client.hmset(id, item_data)
            return "SUCCESS"
    else:
        return "ITEM_NOT_FOUND"


def register_self(
    broker_url: str, vendor_id: str, url: str, title: str, description: str, icon: str
):
    logger.info(f"Connecting to broker at: {broker_url}")
    print(f"Connecting to broker at: {broker_url}")
    transport = AIOHTTPTransport(url=broker_url)
    client = Client(transport=transport, fetch_schema_from_transport=True)

    query = gql_client(
        """#graphql
            mutation Mutation(
                $vendorId: ID!
                $url: String!
                $title: String!
                $description: String!
                $icon: String!
                ) {
                    registerVendor(
                        vendorId: $vendorId
                        url: $url
                        title: $title
                        description: $description
                        icon: $icon
                    )
            }
        """
    )

    result = client.execute(
        query,
        variable_values={
            "vendorId": vendor_id,
            "url": url,
            "title": title,
            "description": description,
            "icon": icon,
        },
    )

    logger.info(f"Connection to broker: {'SUCCESSFUL' if result else 'FAILED'}!")
    print(f"Connection to broker: {'SUCCESSFUL' if result else 'FAILED'}!")


#
schema = make_executable_schema(type_defs, query, mutation)

# Instantiate FastAPI with custom middleware for CORS handling
app = FastAPI(middleware=[Middleware(CORSMiddleware, allow_origins=["*"])])

# Mount the GraphQL app at /query
app.add_route("/", GraphQL(schema, debug=True))

# Mount static files at /static
app.mount("/static", StaticFiles(directory="/app/static"), name="static")

if __name__ == "__main__":
    import uvicorn

    logger.info("Registering self with broker")
    broker_url = os.environ.get("BROKER_URL")

    register_self(
        broker_url,
        "meaty-pythons",
        "http://meaty-pythons:8082/",
        "Meaty Pythons",
        "We sell the best limbless reptilian meat in town!",
        "http://meaty-pythons:8082/static/python.png",
    )
    logger.info("Starting GraphQL server")
    uvicorn.run(app, host="0.0.0.0", port=8082)
