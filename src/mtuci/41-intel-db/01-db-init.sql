-- LAB 1
-- create schema for the project
CREATE SCHEMA IF NOT EXISTS lab1;

-- set schema as default
SET search_path TO lab1;

CREATE TABLE Person (
  PersonId int PRIMARY KEY,
  FirstName varchar,
  LastName varchar
);

INSERT INTO Person(PersonId, FirstName, LastName) VALUES (1, 'John', 'Dough');
INSERT INTO Person(PersonId, FirstName, LastName) VALUES (2, 'Denis', 'Welovegames');
INSERT INTO Person(PersonId, FirstName, LastName) VALUES (3, 'Markiplier', NULL);

CREATE TABLE Address (
  AddressId int PRIMARY KEY,
  PersonId int REFERENCES Person (PersonId),
  City varchar,
  State varchar
);

INSERT INTO Address(AddressId, PersonId, City, State) VALUES (1, 1, 'Moscow', 'Somewhere');
INSERT INTO Address(AddressId, PersonId, City, State) VALUES (2, 2, 'Saransk', 'Almost Nowhere');
INSERT INTO Address(AddressId, PersonId, City, State) VALUES (3, 3, 'Omsk', 'Nowhere');

-- LAB 2
-- create schema for the project
CREATE SCHEMA IF NOT EXISTS lab2;

-- set schema as default
SET search_path TO lab2;

CREATE TABLE Person (
  Id int PRIMARY KEY,
  Email varchar
);

INSERT INTO Person(Id, Email) VALUES (1, 'john@example.com');
INSERT INTO Person(Id, Email) VALUES (2, 'bob@example.com');
INSERT INTO Person(Id, Email) VALUES (3, 'john@example.com');

-- LAB 3
-- create schema for the project
CREATE SCHEMA IF NOT EXISTS lab3;

-- set schema as default
SET search_path TO lab3;

CREATE TABLE Employee (
  Id int PRIMARY KEY,
  Name varchar,
  Salary int,
  ManagerId int
);

COMMENT ON TABLE Employee IS 'The Employee table holds all employees including their managers. Every employee has an Id, and there is also a column for the manager Id.';

INSERT INTO Employee(Id, Name, Salary, ManagerId) VALUES (1, 'Joe', 70000, 3);
INSERT INTO Employee(Id, Name, Salary, ManagerId) VALUES (2, 'Henry', 80000, 4);
INSERT INTO Employee(Id, Name, Salary, ManagerId) VALUES (3, 'Sam', 60000, NULL);
INSERT INTO Employee(Id, Name, Salary, ManagerId) VALUES (4, 'Max', 90000, NULL);