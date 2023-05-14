db = db.getSiblingDB('broker');

db.createUser({
  user: 'brokerUser',
  pwd: 'brokerPassword',
  roles: [
    {
      role: 'readWrite',
      db: 'broker',
    },
  ],
});
