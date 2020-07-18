/* To create a database called for spotted Zebra*/
CREATE DATABASE SpottedZebra;

/* enable pgcrypto for encrypting user password */
CREATE EXTENSION pgcrypto;

/* Creating a table of users for SpottedZebra */
CREATE TABLE Users(
    _id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    roles VARCHAR(50) Not NULL CHECK (roles ='Writer' OR roles='Reader'),
    password TEXT NOT NULL
);

/* Creating a new user using crypt function generating salt using bf algorhythm*/
INSERT INTO Users (name, password, roles, email) VALUES (
    /*INSERT NAME */,
    crypt(/*INSERT PASSWORD*/, /*gen_salt('bf')*/),
    /*INSERT ROLES */,
    /*INSERT EMAIL */
) RETURNING name, roles, email, _id;

/* Logging in User */
SELECT name, roles,email, _id FROM Users 
WHERE email = /*insert username */ 
AND password = crypt(/*insert password*/, password)

/*Deleting User */
DELETE FROM Users
WHERE _id = /*INSERT USERID*/
RETURNING *

/*Updating User*/
UPDATE Users 
SET name = /*INSERT NAME*/, 
roles = /*INSERT ROLES*/, 
email = /* INSERT EMAIL */
WHERE _id = /*INSERT ID*/
RETURNING name, roles, email, _id;



