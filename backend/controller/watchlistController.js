const db = require("../config/db");

// Performing CRUD Operations here 

//1. Create (Add a Movie to the watchlist)

const addMovie = (req,res)=>{
    const {movie_id,title,poster} = req.body;
    const user_id = req.user.id;     //from logged in user 

    db.query(
        "Insert Into watchlist(movie_id,title,poster,user_id) values (?,?,?,?)",
        [movie_id,title,poster,user_id],
        (err,result)=>{
            if(err)
            {
                return res.status(500).json(err);                //The HTTP 500 Internal Server Error is a generic catch-all status code. It signifies that the server encountered an unexpected condition that prevented it from fulfilling your request. The issue is entirely server-side—meaning your device or internet connection is not at fault.
            }
            res.status(201).json({
                message:"Movie Added Successfully"
            });
        }
    );

};


const getWatchList = (req,res)=>{
    db.query(
        "Select * from watchlist where user_id = ?",
        [req.user.id],     //always use this user id this is the id of the logged in user
        (err,result)=>{
            if(err)
            {
                return res.status(500).json(err);
            }
            res.json(result);
        }
    );
};

const DeleteMovie = (req,res)=>{
    const id = req.params.id;     //req.params is values that come from url parh 
    db.query(
        "Delete from watchlist where id = ?",
        [id],
        (err,result)=>{
            if(err)
            {
                return res.status(500).json(err);
            }
            res.json({
                message:"Movie Deleted"
            });
        }
    );
};


const toggleWatched = (req,res)=>{
    const id = req.params.id;

    db.query(
    `UPDATE watchlist
     SET watched = NOT watched
     WHERE id = ?`,
    [id],
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json({
        message: "Updated"
      });
    });
    
};

module.exports = {
    addMovie,
    getWatchList,
    DeleteMovie,
    toggleWatched
};