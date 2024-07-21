CREATE DATABASE campus_cash;

USE campus_cash;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS transactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    amount DECIMAL(10,2),
    description VARCHAR(255),
    category VARCHAR(50),
    date DATE,
    type ENUM('credit', 'debit'),
    FOREIGN KEY (user_id) REFERENCES users(id)
);



CREATE TABLE IF NOT EXISTS savingswallet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    type ENUM('credit', 'debit'),
    amount DECIMAL(10,2),
    date DATE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS BAtransactions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    date DATE,
    amount DECIMAL(10,2),
    description VARCHAR(255),
    category VARCHAR(50),
    type ENUM('credit', 'debit'),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS budgets (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT,
    budgetName VARCHAR(255),
    amount DECIMAL(10,2),
    currency VARCHAR(10),
    category VARCHAR(50),
    recurrence VARCHAR(50),
    startDate DATE,
    endDate DATE,
    FOREIGN KEY (userId) REFERENCES users(id)
);

