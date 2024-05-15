import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: "TestOrder",
    password: "root", //Change this with your password
    port: 5432,
});

async function createTableIfNotExists() {
    try {
        const checkTable = `SELECT EXISTS ( SELECT 1 FROM TestOrder WHERE table_name = orders);`
        const { rows } = await pool.query(checkTable);
        const tableExists = rows[0].exists;

        if (!tableExists) {
            const createTableQuery = `CREATE TABLE orders (orderID SERIAL PRIMARY KEY);`;
            await pool.query(createTableQuery);
            console.log('Table created successfully');
            return true;
        } else {
            console.log('Table already exists');
            return false;
        }
    } catch (error) {
        console.error('Error creating table:', error);
    }
}


export  {pool, createTableIfNotExists}