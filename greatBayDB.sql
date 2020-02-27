ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password
BY 'password';

DROP DATABASE IF EXISTS greatBayDB;

CREATE DATABASE greatBayDB;

USE greatBayDB;

CREATE TABLE items (
  id INT NOT NULL AUTO_INCREMENT,
  category VARCHAR(45) NOT NULL,
  item VARCHAR(45) NOT NULL,
  bid INT NOT NULL,
  PRIMARY KEY (id)
);