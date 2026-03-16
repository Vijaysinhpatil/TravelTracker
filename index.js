import express from "express";
import dotenv from "dotenv";
const app = express();
import bodyParser from "body-parser";
import { connectDB } from "./db/pgdb.js";
import travel_Router from "./routes/travel.routes.js"

dotenv.config({});
const PORT = process.env.PORT || 8082;

// middleware 
app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));


app.set("view engine", "ejs");
app.set("views" , "./views")


// database connection 
connectDB();

// routes
app.use("/" , travel_Router);



app.listen(PORT , () => {
    console.log(`Server is Connected at PORT : ${PORT}`);
    
})
