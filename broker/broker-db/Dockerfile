FROM mongo:5.0.3

COPY init-mongo.js /docker-entrypoint-initdb.d/
COPY data.json /docker-entrypoint-initdb.d/

EXPOSE 27017

CMD mongoimport --host localhost --db broker --collection your_collection --type json --file /docker-entrypoint-initdb.d/data.json --jsonArray
