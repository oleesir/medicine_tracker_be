CREATE
DATABASE medicine_tracker;

CREATE TABLE users
(
    ID        SERIAL PRIMARY KEY,
    FirstName VARCHAR(255)       NOT NULL,
    LastName  VARCHAR(255)       NOT NULL,
    Email     VARCHAR(90) UNIQUE NOT NULL,
    Password  VARCHAR(90)        NOT NULL
);



CREATE TABLE prescribed_drugs
(
    ID     SERIAL PRIMARY KEY,
    UserId INT UNIQUE NOT NULL,
    Drugs  VARCHAR [],
    FOREIGN KEY (UserId)
        REFERENCES users (ID)
);