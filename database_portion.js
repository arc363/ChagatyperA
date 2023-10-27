import { Pool } from 'pg' // pg is the postgres database client package
 
// This configures our connection pool
export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'phylogenetic-data',
    password: 'postgres',
    port: 5432,
 })
 
// A basic error message if the connection pool dies
pool.on('error', (err) => {
    console.error('Unexpected error on idle client', err)
    process.exit(-1)
})
// A function to take the id and data and insert it into the correct row of the database
export async function uploadSubmission(id, jsonData) {
    const client = await pool.connect()
    try {
        await client.query("UPDATE public.submissions SET status_id=5, processed_data=$2 WHERE id=$1;", [id, jsonData])
        return true
    } catch (error:any) {
        console.log(error)
        return false
    } finally {
        client.release()
    }
}
 