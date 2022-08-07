import * as pg from 'pg'
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pg;

const {USER, HOST, DATABASE, PASSWORD, PORT } = process.env

const pool = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: parseInt(<string>PORT, 10)
});


export default pool;
