# Lambda Mart – Report

## Description

Lambda mart is an online distributed marketplace for purchasing "THINGS". It is a distributed system that consists of a frontend, a broker, and a backend. The frontend is a website that allows users to browse and purchase items. The broker is a GraphQL server that acts as a middleman between the frontend and the backend. The backend is a REST API using GraphQL that manages the items and vendors.

## Architecture

The goal when building this system was to create a distributed marketplace where vendors were free to create services in whatever language they wanted, backed by whatever database they wanted. We wanted to make it so that new vendors could register themselves on the fly and that the frontend would be able to query the backend for information about the vendors and their items.

![Architecture diagram](https://gitlab.com/ucd-cs-rem/comp30220-2023/distribute-this-a/-/raw/main/final-network.png)

---

### What would we do differently

- The broker when written in TypeScript was much more convenient
- We would have been better off designing two separate schemas from the start
  - We initially built a schema were the frontend GraphQL schema (website ↔ broker) was very similar to the backend schema (vendor ↔ broker)
  - Caused chicken vs. egg issues where information had to be queried twice to get information that was stored together in the backend.
