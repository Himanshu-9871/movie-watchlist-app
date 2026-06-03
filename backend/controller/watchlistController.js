const db = require("../config/db");

// Performing CRUD Operations here 

//1. Create (Add a Movie to the watchlist)

const addMovie = (req,res)=>{
    let { movie_id, title, poster } = req.body;
    const user_id = req.user.id;

    if (!title || !title.trim()) {
        return res.status(400).json({ message: "Title is required" });
    }

    title = title.trim();
    movie_id = movie_id?.toString().trim() || null;
    poster = poster?.toString().trim() || null;

    if (poster && poster.startsWith("data:")) {
        return res.status(400).json({ message: "Poster must be a URL, not a base64 string." });
    }

    if (poster && poster.length > 255) {
        return res.status(400).json({ message: "Poster URL is too long. Use a shorter URL." });
    }

    console.log(`I am in backend`)
    db.query(
        "Insert Into watchlist(movie_id,title,poster,user_id) values (?,?,?,?)",
        [movie_id, title, poster, user_id],
        (err,result)=>{
            if(err)
            {
                console.error("Add movie error:", err);
                return res.status(500).json({ message: "Could not save movie" });
            }
            res.status(201).json({
                id: result.insertId,
                movie_id,
                title,
                poster,
                user_id,
                watched: false,
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