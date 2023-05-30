FROM mongo:5.0.3

EXPOSE 27017

# COPY ./init-mongo.js /docker-entrypoint-initdb.d/
# COPY ./items.json .

# CMD mongoimport --host lambda-market-db -u $MONGO_ROOT_USER -p $MONGO_ROOT_PASSWORD --authenticationDatabase admin --db lambda-market --collection Item --type json --file /items.json --jsonArray --upsertFields classId