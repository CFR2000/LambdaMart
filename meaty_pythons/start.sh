#!/bin/bash
# Start the server and pass in the host name and port environment variables
python /app/db/init.py --host=$HOSTNAME --port=$PORT
python /app/src/resolvers.py
