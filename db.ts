import  pg from 'pg'
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pg;

const {USER, HOST, DATABASE, PASSWORD, DBPORT } = process.env

const pool = new Pool({
    user: USER,
    host: HOST,
    database: DATABASE,
    password: PASSWORD,
    port: parseInt(<string>DBPORT, 10),
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
});


export default pool;
