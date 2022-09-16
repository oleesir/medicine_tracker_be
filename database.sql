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
    refresh_token VARCHAR,
    PRIMARY KEY (id)
);


CREATE TABLE prescriptions
(
    id                    uuid   DEFAULT uuid_generate_v4(),
    user_id               uuid    NOT NULL,
    drug_name             VARCHAR NOT NULL,
    dose                  NUMERIC     NOT NULL CHECK (dose >= 0),
    unit                  unit   DEFAULT 'mg',
    end_date DATE,
    status                status DEFAULT 'active',
     first_timer VARCHAR NOT NULL,
     second_timer VARCHAR  NULL,
     third_timer VARCHAR  NULL,
    FOREIGN KEY (user_id)
        REFERENCES users (id) ON DELETE CASCADE,
    PRIMARY KEY (id)
);



CREATE TYPE unit AS ENUM('mg', 'ml', 'microgram');
CREATE TYPE status AS ENUM('active', 'ended');
CREATE TYPE form AS ENUM('liquid', 'capsule', 'tablet');
CREATE TYPE day_or_night AS ENUM('AM', 'PM');
CREATE TYPE number_of_intake_types AS ENUM('1','2','3','4');

DROP TYPE number_of_intake_types;
DROP TYPE status;


DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS prescriptions CASCADE;


ALTER TABLE prescriptions
    RENAME name TO drug_name;


ALTER TABLE prescriptions
    ADD COLUMN frequency_unit frequency_unit DEFAULT 'second(s)';


SELECT *
FROM users;

SELECT *
FROM prescriptions;



SELECT *
FROM prescriptions WHERE prescription_end_date = $1;

ALTER TABLE prescriptions
ALTER COLUMN dose TYPE NUMERIC;