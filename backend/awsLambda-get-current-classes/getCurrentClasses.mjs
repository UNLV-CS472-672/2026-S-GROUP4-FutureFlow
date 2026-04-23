//import the mariaDB library to connect to the database
import * as mariadbLib from "mariadb"

//make a connection pool for connecting to the database

let pool;

pool = mariadbLib.createPool
({
    //log in to the database(testing)
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: "root",
    password: "ff1234",
    database: "futureflow",
    connectionLimit: 5,
  //   ssl: 
  // {
  //   rejectUnauthorized: false
  // }
});

export const handler = async (event) => 
{
    let conn; 

    let semester; //variable for semester

    try
    {
        //get the user IF from the path 
        const user_ID = event.pathParameters?.ID;

        //check if the user ID exists or is ther e
        if (!user_ID)
        {   
            return{
                statusCode: 400,
                body: JSON.stringify({ error: "User ID missing"}),
            };
        }
        conn = await pool.getConnection();


        //query for retuning the students current class info 
        const rows = await conn.query
        (
            `
            SELECT  ci.course_number, uc.semester 
            FROM user_course_junction AS us
            JOIN course_info as ci 
                on uc.course_id = ci.course_id
            WHERE uc.user_id = ?
            `,
            [user_ID, semester]
        );

        return{
            statusCode: 200, 
            body: JSON.stringify(rows),
        };
    }

    catch (err)
    {
        console.error(err);
        return{
            statusCode: 500,
            body: JSON.stringify({ error: err.message }), 
        };
    }

    finally{
        if(conn) conn.release();
    }
}

