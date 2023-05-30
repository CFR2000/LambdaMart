import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace";

import { typeDef as Product } from "./schema/product.js";
import { typeDef as Vendor } from "./schema/vendor.js";
import { typeDef as QueryType } from "./schema/query.js";
import { typeDef as MutationType } from "./schema/mutation.js";

import Query from "./resolvers/query.js";
import Mutation from "./resolvers/mutation.js";

import { Context } from "./types/types.js";

const uri = "mongodb://broker-db:27017";

const client = new MongoClient(uri, {
  auth: {
    username: "brokerUser",
    password: "brokerPassword",
  },
  authSource: "broker",
});

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs: [Product, Vendor, QueryType, MutationType],
  resolvers: { Query, Mutation },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginInlineTrace(),
  ],
});

const context = async () => ({ db: (await client.connect()).db("broker") });

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>({
    credentials: false,
    methods: ["GET", "POST", "OPTIONS", "PUT", "DELETE", "PATCH", "HEAD"],
    origin: [
      "http://localhost:8000",
      "https://studio.apollographql.com",
      "http://website:8000",
      "http://host.docker.internal:8000",
    ],
    allowedHeaders: ["*"],
    exposedHeaders: ["*"],
  }),
  bodyParser.json(),
  expressMiddleware(server, { context })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000, host: "0.0.0.0" }, resolve)
);

console.log(`🚀 Server ready at http://0.0.0.0:4000/graphql`);
