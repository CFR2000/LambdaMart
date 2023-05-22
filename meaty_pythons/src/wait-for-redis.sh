#!/bin/sh
# wait-for-redis.sh

set -e

# Log the date and time when the script starts
echo "Script started at $(date)"

host="$1"
shift
cmd="$@"

# Print the value of host and cmd
echo "Host: $host"  
echo "CMD: $cmd" 

# Attempt to ping the Redis server
echo "Attempting to ping Redis server at $host..."
until redis-cli -h "$host" ping; do
  # Log the date and time of each failed attempt
  echo "[ERROR] $(date): Command 'redis-cli -h $host ping' failed. Redis is unavailable - sleeping"
  sleep 1
done

# Log the date and time when Redis server becomes available
echo "[INFO] $(date): Redis is up - executing command: $cmd"
exec $cmd

# Log the date and time when the script ends
echo "Script ended at $(date)"
