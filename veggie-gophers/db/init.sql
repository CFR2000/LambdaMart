CREATE TABLE inventory_items (
    id INTEGER PRIMARY KEY,
    stockLevel INTEGER NOT NULL,
    price FLOAT NOT NULL,
    name VARCHAR(255) NOT NULL
);

COPY inventory_items (id, stockLevel, price, name)
FROM '/items.csv'
DELIMITER ','
CSV HEADER;
