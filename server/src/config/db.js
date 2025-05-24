const { Pool } = require('pg');
const { drizzle } = require('drizzle-orm/node-postgres');
const dotenv = require('dotenv');

dotenv.config(); 


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, {logger: true});

module.exports = db;