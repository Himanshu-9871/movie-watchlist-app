const express = require("express");
const {
    register,
    login
} = require("../controller/authController");
const router = express.Router();

router.post("/register",register);
// router.post("/register",(req,res)=>{    //testing
//     res.send("hello");
// });
router.post("/login",login);

module.exports = router;
