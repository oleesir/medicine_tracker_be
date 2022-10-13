import pg from 'pg'
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pg;

const { USER, HOST, DB_NAME, DB_URI, PASSWORD, DB_PORT } = process.env

const config = DB_URI ?
    {
        connectionString: DB_URI,
    } :
    {
        user: USER,
        host: HOST,
        database: DB_NAME,
        password: PASSWORD,
        port: parseInt(<string>DB_PORT, 10),
    }

const pool = new Pool({
        ...config,
        idleTimeoutMillis: 0,
        connectionTimeoutMillis: 0
});


export default pool;
