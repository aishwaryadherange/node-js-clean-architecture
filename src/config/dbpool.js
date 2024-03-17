import mysql from 'mysql2';
import { config } from 'dotenv';
config({ path: `.env.${process.env.NODE_ENV}` });

const dbpool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    queueLimit: 0,
    connectionLimit: 10,
})

export default dbpool;