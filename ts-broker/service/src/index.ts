import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

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
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const context = async () => ({ db: (await client.connect()).db("broker") });

await server.start();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(
  "/",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, { context })
);

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000, host: "0.0.0.0" }, resolve)
);

console.log(`🚀 Server ready at http://0.0.0.0:4000/`);
