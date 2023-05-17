import logging
import csv
import redis
import configparser
import argparse

# Load configuration from config.ini
config = configparser.ConfigParser()
config.read('/app/config.ini')

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# loads data from a CSV file into the Redis database.
def load_data_to_redis(file_path, redis_connection):
    with open(file_path, 'r') as csv_file:
        reader = csv.DictReader(csv_file)
        for row in reader:
            # convert each row into a dictionary and store it in Redis
            redis_connection.hset(row['name'], mapping=row)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Redis server host and port")
    parser.add_argument('--host', default=config.get('REDIS', 'HOST'), help='host to listen on')
    parser.add_argument('--port', default=config.get('REDIS', 'PORT'), help='port to listen on')
    args = parser.parse_args()

    # Update the port value if it is an empty string
    if args.port == '':
        args.port = config.get('REDIS', 'PORT')

    # redis_connection = redis.Redis(host=args.host, port=args.port, db=0)


    # logger.debug(f"Arguments: {args}")

    redis_connection = redis.Redis(host=args.host, port=args.port, db=0)

    load_data_to_redis('/app/db/items.csv', redis_connection)
