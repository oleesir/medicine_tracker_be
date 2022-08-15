CREATE
DATABASE medicine_tracker;

CREATE
EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users
(
    id            uuid DEFAULT uuid_generate_v4(),
    first_name    VARCHAR(255)       NOT NULL,
    last_name     VARCHAR(255)       NOT NULL,
    email         VARCHAR(90) UNIQUE NOT NULL,
    password      VARCHAR(90)        NOT NULL,
    refresh_token VARCHAR(255),
    PRIMARY KEY (id)
);


CREATE TABLE prescribed_drugs
(
    id      uuid DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    drugs   VARCHAR [],
    FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE
        PRIMARY KEY (id)
);

CREATE TABLE prescriptions
(
    id        uuid DEFAULT uuid_generate_v4(),
    user_id   uuid         NOT NULL,
    drug_name VARCHAR(500) NOT NULL,
    dose      INT          NOT NULL CHECK (dose >= 0),
    unit      unit DEFAULT 'mg',
    drug_form form DEFAULT 'tablet',
    with_food food DEFAULT 'no',
    take_for  VARCHAR(255) NOT NULL,
    FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (id)

);

CREATE TYPE unit AS ENUM('mg', 'ml', 'microgram');
CREATE TYPE form AS ENUM('liquid', 'capsule', 'tablet');
CREATE TYPE food AS ENUM('no', 'yes');


DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS prescribed_drugs CASCADE;
DROP TABLE IF EXISTS prescriptions CASCADE;


ALTER TABLE prescriptions
    RENAME name TO drug_name;


SELECT *
FROM users;

SELECT *
FROM prescriptions;