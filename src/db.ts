import  pg from 'pg'
import dotenv from 'dotenv';

dotenv.config();

const {Pool} = pg;

const {USER, HOST, DATABASE,DATABASE_URI, PASSWORD, DB_PORT } = process.env

const pool = new Pool({
    user: USER,
    host: HOST,
    database: process.env.NODE_ENV === "development" ? DATABASE : DATABASE_URI ,
    password: PASSWORD,
    port: parseInt(<string>DB_PORT, 10),
    idleTimeoutMillis: 0,
    connectionTimeoutMillis: 0,
});


export default pool;
