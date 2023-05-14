CREATE TABLE inventory_items (
    id INTEGER PRIMARY KEY,
    stock_level INTEGER NOT NULL,
    price FLOAT NOT NULL,
    name VARCHAR(255) NOT NULL
);

COPY inventory_items (id, stock_level, price, name)
FROM '/items.csv'
DELIMITER ','
CSV HEADER;
