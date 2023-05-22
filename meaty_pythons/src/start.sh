#!/bin/bash
# Set permissions for the script
chmod +x /app/wait-for-redis.sh
# Start the server and pass in the host name and port environment variables
/app/wait-for-redis.sh meaty-pythons-db python /app/db/init.py --host=meaty-pythons-db --port=$REDIS_PORT

python /app/resolvers.py
