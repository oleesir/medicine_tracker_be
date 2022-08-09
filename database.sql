CREATE
DATABASE medicine_tracker;



CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id        uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    first_name VARCHAR(255)       NOT NULL,
    last_name  VARCHAR(255)       NOT NULL,
    email     VARCHAR(90) UNIQUE NOT NULL,
    password  VARCHAR(90)        NOT NULL
);



CREATE TABLE prescribed_drugs
(
    id     uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid UNIQUE NOT NULL,
    drugs  VARCHAR [],
    FOREIGN KEY (user_id)
        REFERENCES users (id)
);


DROP TABLE IF EXISTS medicine_tracker CASCADE;