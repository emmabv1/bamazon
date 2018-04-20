DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45) NULL,
  department_name VARCHAR(45) NULL,
  price INT NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Stripey Tights", "Hosiery", 10, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Fishnets", "Hosiery", 15, 180);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Pokeball Purse", "Accessories", 35, 70);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Ruby Red Slippers", "Shoes", 40, 68);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bunny Ears", "Accessories", 20, 97);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lolita Wig", "Accessories", 25, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Trench Coat", "Men's Apparel", 150, 8);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Red Lightsaber", "Props", 70, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Victorian Black Dress", "Women's Apparel", 180, 52);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Time Turner", "Accessories", 10, 9);


