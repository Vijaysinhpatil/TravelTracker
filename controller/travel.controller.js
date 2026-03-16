import { db } from "../db/pgdb.js";

export const fetchCountryCode = async(req , res) => {
    try {
        
        const result = await db.query(
            "SELECT country_code FROM  visited_countries"
        );

        const countries = result.rows.map((country) => country.country_code);

        console.log(result.rows);


        res.render("index.ejs" , {
            countries : countries,
            total : countries.length
        })
        
    } catch (error) {
        console.log("Error while selecting countries", error);
    }
}

export const insertCountry = async(req , res) => {
   try {
       
    const input = req.body["country"];

    const result = await db.query(
       "SELECT country_code FROM countries WHERE LOWER(country_name) = LOWER($1)",
        [input]
    );



    if(result.rows.length !== 0){
        const data = result.rows[0]
        const countryCode = data.country_code;


        // checking if the country is alredy exist or not

        const alreadyVisited = await db.query(
            "SELECT 1 FROM visited_countries WHERE country_code = $1",
            [countryCode]
        )

        if(alreadyVisited.rows.length > 0){
            const existing = await db.query("SELECT country_code FROM visited_countries");
            const countries = existing.rows.map((c) => c.country_code);

            return res.render("index.ejs" , {
                countries : countries,
                total : countries.length,
                error : "Country already added..!"
            })
        }
        await db.query("INSERT INTO visited_countries (country_code) VALUES ($1)" , [
            countryCode
        ]);
        res.redirect("/");


    } else{
        res.render("index.ejs" , {
            countries : [],
            total : 0,
            error : "Country not Found.!"
        })
    }
    
   } catch (error) {
         console.log("Error while inserting data to the database" , error);
         
   }
}