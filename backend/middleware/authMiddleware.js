const jwt = require("jsonwebtoken");
const authMiddleWare = (req,res,next)=>{
    
    try{
        const authHeader = req.headers.authorization;

        if(!authHeader)
        {
            return res.status(401).json({
                message:"No Token provided"
            });
        }
        //extract token 
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(               //now verify that token 
            token,
            process.env.JWT_SECRET
        );     
        req.user = decoded;   //tells exactly which user is making request
        next(); // Token verified successfully now Move to Next function refer to docs for more 

    }
    catch(error){
        return res.status(401).json({
            message:"Invalid Token"
        });
    }
};
module.exports = authMiddleWare;

//we put into try catch because jwt token verify can throw errors