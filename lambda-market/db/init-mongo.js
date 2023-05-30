db = db.getSiblingDB("lambda-market");

db.createUser({
  user: "lambdaUser",
  pwd: "lambdaPassword",
  roles: [
    {
      role: "readWrite",
      db: "lambda-market",
    },
  ],
});
