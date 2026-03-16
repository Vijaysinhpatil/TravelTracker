import dotenv from "dotenv";
dotenv.config();
import pg from "pg";

export const db = new pg.Pool({
    user : "postgres",
    host : "localhost",
    database : "Travel_Tracker",
    password : process.env.PG_ADMIN_DB_PASSWORD,
    port : 5432
})

export const connectDB = async() => {
    try {
        await db.connect();
        console.log("Database connected Successully");
        
    } catch (error) {
        console.log("Database is not connected");
         
    }  
}