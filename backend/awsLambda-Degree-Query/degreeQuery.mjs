//import the mariaDB library to connect to the database
import * as mariadbLib from "mariadb"

//make a connection pool for connecting to the database

let pool;

pool = mariadbLib.createPool
({

    /* 
      Commented out for testing purposes (will be used for actual database)
    */
  //   host: process.env.DB_HOST,
  //   port: Number(process.env.DB_PORT || 3306),
  //   user: "pastflow",
  //   password: "slowstart401$",
  //   database: "futureflow",
  //   connectionLimit: 5,
  // //   ssl: 
  // // {
  // //   rejectUnauthorized: false
  // // }

    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT || 3306),
    user: "root",
    password: "FF1234",
    database: "futureflow",
    connectionLimit: 5,
  //   ssl: 
  // {
  //   rejectUnauthorized: false
  // }


  
  });

  //main lambda function 
export const handler = async (event) => {
  let conn; //hold the database connection 

  try
  {
    //get the degree name from the path
    const degreeName = event.pathParameters?.ID;

    //get a connection from the pool 
    conn = await pool.getConnection();

    //execute an SQL wuery to find the matching degree
    //(? is just a placeholder)
    const rows = await conn.query
    (
      "SELECT * FROM degree_info WHERE degree_name = ?",
      [degreeName]
    );

    //return the successful response with the query results
    return{
      statusCode: 200,
      body: JSON.stringify(rows)
    };
  }

  //if there is an error 
  catch (err)
  {
    console.error(err);
    return{
      statusCode: 500,
      body: JSON.stringify({error: err.message})
    };
  }

  finally
  {
    //release the connection back to the pool
    if (conn) conn.release();
  }
};
