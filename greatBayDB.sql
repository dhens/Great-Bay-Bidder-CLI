ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password
BY 'password';

DROP DATABASE IF EXISTS greatBayDB;

CREATE DATABASE greatBayDB;

USE greatBayDB;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  itemName VARCHAR(45) NOT NULL,
  price INT NOT NULL,
  PRIMARY KEY (id)
);