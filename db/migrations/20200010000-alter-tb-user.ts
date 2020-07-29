import { Logger } from "@nestjs/common";
import { QueryInterface } from "sequelize/types";

const sql = `
CREATE TABLE accounts (
	user_id serial PRIMARY KEY,
	username VARCHAR ( 50 ) UNIQUE NOT NULL,
	password VARCHAR ( 50 ) NOT NULL,
	email VARCHAR ( 255 ) UNIQUE NOT NULL,
	created_on TIMESTAMP NOT NULL,
        last_login TIMESTAMP 
);`;

module.exports = {
    up: queryInterface => queryInterface.sequelize.query(sql),
    down: () => {},
};


