const express = require("express");
const authMiddleWare = require("../middleware/authMiddleware");

//import the controllers 

const{
    addMovie,
    getWatchList,
    DeleteMovie,
    toggleWatched
} = require("../controller/watchlistController");

const router = express.Router();

router.use(authMiddleWare);
//This line applies middleware to ALL routes below it.  see more in doc
router.get("/",getWatchList);

router.post("/",addMovie);

router.delete("/:id",DeleteMovie);   //to make request that delete this id movie

router.put("/:id",toggleWatched);   //used for updation

module.exports = router;