import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
import request, { gql as req_gql } from "graphql-request";
import sqlite3 from "sqlite3";

// Create a new SQLite database connection
const db = new sqlite3.Database(
  "/data/fruitful.db", // <-- update this line
  sqlite3.OPEN_READWRITE,
  err => {
    if (err) {
      console.error(err.message);
    }
    console.log("Connected to the fruitful.db SQLite database.");
  },
);

const typeDefs = gql`
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
`;

// Define resolvers
const resolvers = {
  Query: {
    vendor: (_, __, { db }) => {
      return {
        title: "Fruitful JavaScripts",
        description: "We sell the best fruits in town!",
        icon: "http://localhost:8084/static/fruits.png",
        inventory: new Promise((resolve, reject) => {
          // Fetch inventory data from the database
          db.all("SELECT * FROM inventory", (err, rows) => {
            if (err) reject(err);
            else
              resolve(
                rows.map(row => ({
                  ...row,
                  stockLevel: row.stock_level,
                })),
              );
          });
        }),
      };
    },
    item: (_, { id }, { db }) => {
      return new Promise((resolve, reject) => {
        // Fetch item data from the database based on ID
        db.get("SELECT * FROM inventory WHERE id = ?", [id], (err, row) => {
          if (err) {
            console.log("Error fetching item from database");
            reject(err);
          } else if (Boolean(row)) {
            resolve({
              ...row,
              stockLevel: row.stock_level,
            });
          } else {
            console.log("Item not found in database");
            reject("Item not found");
          }
        });
      });
    },
  },
  Mutation: {
    purchase: (_, { id, quantity }, { db }) => {
      return new Promise((resolve, reject) => {
        db.serialize(() => {
          // Fetch the stock level of the item from the database
          db.get(
            "SELECT stock_level FROM inventory WHERE id = ?",
            [id],
            (err, row) => {
              if (err) {
                reject(err);
              } else if (!row) {
                resolve("ITEM_NOT_FOUND");
              } else if (row.stock_level < quantity) {
                resolve("INSUFFICIENT_STOCK");
              } else {
                // Update the stock level in the database
                db.run(
                  "UPDATE inventory SET stock_level = stock_level - ? WHERE id = ?",
                  [quantity, id],
                  function (err) {
                    if (err) {
                      reject(err);
                    } else {
                      if (this.changes > 0) {
                        resolve("SUCCESS");
                      } else {
                        resolve("ITEM_NOT_FOUND");
                      }
                    }
                  },
                );
              }
            },
          );
        });
      });
    },
  },
};

const startApolloServer = async () => {
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: { db },
  });

  await apolloServer.start();

  const app = express();
  apolloServer.applyMiddleware({ app, path: "/" });
  app.use("/static", express.static("../static"));

  const port = process.env.RESOLVERS_PORT || 8084;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

const registerService = async (brokerUrl, params) => {
  await new Promise(resolve => setTimeout(resolve, 5000));
  const mutation = req_gql`#graphql
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
  `;
  console.log(`Registering service with params: ${JSON.stringify(params)}`);
  const result = await request(brokerUrl, mutation, params);
  console.log(`Registered service with result: ${result.registerVendor}`);
};

startApolloServer().catch(err => {
  console.error("Error starting Apollo Server:", err);
});

const brokerUrl = process.env.BROKER_URL;

// Register the vendor service with the broker
registerService(brokerUrl, {
  vendorId: "fruitful-javascripts",
  url: "http://fruitful-javascripts:8084",
  title: "Fruitful JavaScripts",
  description: "We sell the best fruits in town!",
  icon: "http://localhost:8084/static/fruits.png",
});
