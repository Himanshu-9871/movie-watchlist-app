//setup connection of db and 
const mysql_connection = require("mysql2");
//this stores the mysql2 package inside the variable became a package now 

const connection = mysql_connection.createConnection({
    host:process.env.DB_HOST,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    port:process.env.DB_PORT
});

//process is the global object in node js gives control over current running processes

connection.connect((err)=>{     //this part does the actual connection here
    if(err)
    {
        console.log(err);
    }
    else{
        console.log("Database Connected");
    }
});

module.exports = connection;  //other files also need the database connection so we exported the connection variable to others
