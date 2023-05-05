CREATE TABLE inventory_items (
    id SERIAL PRIMARY KEY,
    stock_level INTEGER NOT NULL,
    name VARCHAR(255) NOT NULL
);

COPY inventory_items (id, stock_level, name)
FROM '/items.csv'
DELIMITER ','
CSV HEADER;
