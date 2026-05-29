const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");   //json web token

const register = async(req,res) =>{
    //destructuring of the received data from frontend
    const {name , email , password} = req.body;
    console.log("Register route hit");
    console.log(req.body);
    db.query(
        "select * from users where email = ?",   //this is placeholder
        [email],
        
        async(err,result)=>{
            if(err){
                console.log(err);
                return res.status(500).json(err);
            }
            if(result.length > 0)  //means user already exists
            {
                return res.status(400).json({
                    message : "User Already Exists"
                });
            }
            const hashedPassword = await bcrypt.hash(password,10);
            db.query(
                "Insert into users (name,email,password) values (?,?,?)",
                [name,email,hashedPassword],
                (err,result)=>{
                    if(err)
                    {
                        return res.status(500).json(err)
                    }
                    res.status(201).json({
                        message:"User Registered Successfully"
                    });
                }
            );
        }
    );

};

// const register = async (req,res)=>{
//     console.log("Register route hit");
//     console.log(req.body);

//     return res.json({
//         message:"Register route working"
//     });
// }

const login = async(req,res)=>{
    const {email,password} = req.body;
    db.query(
        "select * from users where email = ?",
        [email],
        async(err,result)=>{     //this result contains the query output 
            if(result.length === 0)
            {
                return res.status(400).json({
                    message:"Please Enter Correct Email Id"
                });
            }
            const user = result[0];   //contains only one user at a time and it is in the form of array becauuse data fetched from database
            const isMatch = await bcrypt.compare(
                password,      // this is newly entered password by the user
                user.password //this is present in the database 
            )
            if(!isMatch)
            {
                return res.status(400).json({
                    message: "Password didn't Matched"
                })
            }

            //Now if conditions doesn't satisfies that means user is valid and hence we need to generate token for that user for future credentials or more verifications 
            const token = jwt.sign(
                {id:user.id},                 //payload {actual data of the user}
                process.env.JWT_SECRET,       //secret key
                {expiresIn : "7d"}
            );
            res.json({
                token,
                user:{
                    id : user.id,
                    name : user.name,
                    email : user.email
                }
            });
        }
    );
};

module.exports = {
    register,
    login
};