DROP DATABASE IF EXISTS zamazon_db;
CREATE DATABASE zamazon_db;
USE zamazon_db;

CREATE TABLE products (
item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
product_name VARCHAR(35) NOT NULL,
department_name VARCHAR(30),
price DECIMAL(10,2),
stock_quantity INTEGER(6),
PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("schwinns", "bikes", 66.88, 40), ("silver", "jewelry", 12.12, 12), ("gold", "jewelry", 21.25, 75), ("twinkle lights", "solar products", 2.42, 201), ("spot lights", 
"solar products", 1.64, 187);

INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES ("books", "fiction", 6.88, 100), ("truffles", "chocolates", 2.12, 120), 
("nuts", "chocolates", 1.25, 75);

SELECT * FROM products;

