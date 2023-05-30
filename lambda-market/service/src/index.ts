import express from "express";
import http from "http";
import cors from "cors";
import bodyParser from "body-parser";
import { MongoClient } from "mongodb";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginInlineTrace } from "@apollo/server/plugin/inlineTrace";

import request, { gql } from "graphql-request";

import { typeDef as Vendor } from "./schema/vendor.js";
import { typeDef as QueryType } from "./schema/query.js";
import { typeDef as MutationType } from "./schema/mutation.js";

import Query from "./resolvers/query.js";
import Mutation from "./resolvers/mutation.js";

import { Context } from "./types/types.js";

const uri = process.env.HOST_DB_URI || "mongodb://localhost:27017";

const client = new MongoClient(uri, {
  auth: {
    username: "lambdaUser",
    password: "lambdaPassword",
  },
  authSource: "lambda-market",
});

const app = express();

const httpServer = http.createServer(app);

const server = new ApolloServer<Context>({
  typeDefs: [Vendor, QueryType, MutationType],
  resolvers: { Query, Mutation },
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginInlineTrace(),
  ],
});

const context = async () => ({
  db: (await client.connect()).db("lambda-market"),
});

await server.start();

app.use(
  "/graphql",
  cors<cors.CorsRequest>(),
  bodyParser.json(),
  expressMiddleware(server, { context })
);

app.use("/static", express.static("static"));

await new Promise<void>((resolve) =>
  httpServer.listen({ port: 4000, host: "0.0.0.0" }, resolve)
);

console.log(`🚀 Server ready at http://0.0.0.0:4000/graphql`);

const registerService = async (brokerUrl, params) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const mutation = gql`
    #graphql
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

  const result: { registerVendor: string } = await request(
    brokerUrl,
    mutation,
    params
  );
  console.log(`🚀 Vendor registration result: ${result.registerVendor}`);
};

const brokerUrl = process.env.BROKER_URL;
// Register the vendor service with the broker

if (brokerUrl) {
  registerService(brokerUrl, {
    vendorId: "lambda-market",
    url: "http://lambda-market:8085/graphql",
    title: "Lambda Market",
    description: "We sell everything in town!",
    icon: "http://localhost:8085/static/Lambda-market.png",
  });
}
