#!/bin/bash
# Start the server and pass in the host name and port environment variables
/app/src/wait-for-redis.sh $REDIS_HOST -- python /app/db/init.py --host=$REDIS_HOST --port=$REDIS_PORT
python /app/src/resolvers.py
