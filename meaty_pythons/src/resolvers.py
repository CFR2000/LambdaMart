import configparser
from ariadne import ObjectType, EnumType, QueryType, MutationType, gql, make_executable_schema
from ariadne.asgi import GraphQL
from redis import Redis
import json
from fastapi import FastAPI
from starlette.middleware import Middleware
from starlette.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

# Load configuration from config.ini
config = configparser.ConfigParser()
config.read('/app/config.ini')

# Replace hardcoded Redis server and port values with values from config.ini
redis_client = Redis(host=config.get('REDIS', 'HOST'), port=config.get('REDIS', 'PORT'), db=0)


type_defs = gql("""
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
""")

query = QueryType()
mutation = MutationType()


@query.field("vendor")
def resolve_vendor(*_):
    inventory = []
    for key in redis_client.keys():
        item_data = redis_client.hgetall(key)
        if item_data:
            inventory.append({
                "id": key.decode('utf-8'),
                "stockLevel": int(item_data[b'stock_level']),
                "price": float(item_data[b'price'])
            })
        else:
            print(f"Invalid data for key: {key}")

    vendor = {
        "title": "Meaty Pythons",
        "description": "We sell the best limbless reptillion meat in town!",
        "icon": "http://localhost:8081/static/python.png",
        "inventory": inventory,
    }

    return vendor


# restock = MutationType()

@query.field("item")
def resolve_item(*_, id):
    item_data = redis_client.hgetall(id)
    if item_data:
        return {
            "id": id,
            "stockLevel": int(item_data[b'stock_level']),
            "price": float(item_data[b'price'])
        }
    else:
        return None

@mutation.field("purchase")
def resolve_purchase(*_, id, quantity):
    item_data = redis_client.hgetall(id)
    if item_data:
        if int(item_data[b'stock_level']) < quantity:
            return "INSUFFICIENT_STOCK"
        else:
            item_data[b'stock_level'] = str(int(item_data[b'stock_level']) - quantity)
            redis_client.hmset(id, item_data)
            return "SUCCESS"
    else:
        return "ITEM_NOT_FOUND"


# 
schema = make_executable_schema(type_defs, query, mutation)

# Instantiate FastAPI with custom middleware for CORS handling
app = FastAPI(middleware=[
    Middleware(CORSMiddleware, allow_origins=['*'])
])

# Mount the GraphQL app at /query
app.add_route("/query", GraphQL(schema, debug=True))

# Mount static files at /static
app.mount("/static", StaticFiles(directory="/app/static"), name="static")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8082)