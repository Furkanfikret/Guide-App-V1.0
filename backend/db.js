import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config({ path: '../.env' });
const {Pool} = pkg;

const pool =new Pool({
connectionString:process.env.PG_DB_URL,
ssl: {
    rejectUnauthorized: false
  }
})
pool.connect()
    .then(()=>console.log('Connection Database is Successful!'))
    .catch((err)=>console.log(`Connection Database is Failed ! ${err}`))
export default pool;