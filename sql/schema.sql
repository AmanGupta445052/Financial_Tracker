-- Creating the database if it does not already exist
CREATE DATABASE  financial_Tracker;
-- Switching to the newly created or existing database
USE Financial_Tracker;

-- Creating the Users table
CREATE TABLE Users (
    user_id INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100)
);

-- Creating the Categories table
CREATE TABLE  Categories(
    category_id INT IDENTITY(1,1) PRIMARY KEY,
    category_name VARCHAR(100)
);

-- Creating the Transactions table
CREATE TABLE  Transactions (
    transaction_id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    date DATE,
    amount DECIMAL(10, 2),
    category_id INT,
    type VARCHAR(10) CHECK (type IN ('income', 'expense')),
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Creating the Budgets table
CREATE TABLE  Budgets (
    budget_id INT  IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    category_id INT,
    amount DECIMAL(10, 2),
    month INT,
    year INT,
    FOREIGN KEY (user_id) REFERENCES Users(user_id),
    FOREIGN KEY (category_id) REFERENCES Categories(category_id)
);

-- Creating the Goals table
CREATE TABLE  Goals (
    goal_id INT  IDENTITY(1,1) PRIMARY KEY,
    user_id INT,
    goal_description VARCHAR(255),
    target_amount DECIMAL(10, 2),
    current_amount DECIMAL(10, 2),
    deadline DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Inserting initial data into the Users table
INSERT INTO Users (name, email, password) VALUES 
('John Doe', 'john@example.com', 'password123'),
('Jane Smith', 'jane@example.com', 'password1234');

-- Inserting initial data into the Categories table
INSERT INTO Categories (category_name) VALUES 
('Groceries'), 
('Rent'), 
('Salary'), 
('Entertainment'), 
('Utilities'), 
('Transport'), 
('Health');

-- Inserting initial data into the Transactions table
INSERT INTO Transactions (user_id, date, amount, category_id, type) VALUES 
(1, '2024-07-01', 50.00, 1, 'expense'),
(1, '2024-07-02', 2000.00, 3, 'income'),
(1, '2024-07-03', 700.00, 2, 'expense'),
(2, '2024-07-02', 100.00, 2, 'expense'),
(2, '2024-07-02', 2000.00, 3, 'income');

-- Inserting initial data into the Budgets table
INSERT INTO Budgets (user_id, category_id, amount, month, year) VALUES 
(1, 1, 500.00, 7, 2024);

-- Inserting initial data into the Goals table
INSERT INTO Goals (user_id, goal_description, target_amount, current_amount, deadline) VALUES 
(1, 'Save for vacation', 3000.00, 1500.00, '2024-12-31');
