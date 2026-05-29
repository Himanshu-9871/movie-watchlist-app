# What this app variable can do ?

1. Create Routes
app.get(...)
app.post(...)
app.put(...)
app.delete(...)

Meaning:

Handle incoming requests

2. Register Middleware
app.use(...)

Example:

app.use(cors());
app.use(express.json());

Meaning:

Run middleware before routes

3. Start Server
app.listen(...)

Example:

app.listen(5000);

Meaning:

Start accepting requests



``` 
require("express")
        |
        v
     express
        |
        |  call function
        v
    express()
        |
        v
       app
        |
        ├── app.get()
        ├── app.post()
        ├── app.put()
        ├── app.delete()
        ├── app.use()
        └── app.listen()
```


express
    =
    Factory

express()
    =
    Create Express Application

app
    =
    Actual Backend Server Object


`` app.use(express.json()); `` 

Imagine frontend sends:

{
  "email":"abc@gmail.com",
  "password":"123456"
}

Without:

express.json()

backend cannot read it.


`` api.use("/api/auth",authRoutes)``

means

Any request beginning with:

/api/auth

should be handled by authRoutes.js

--------------

Inside authRoutes:

``router.post("/register", register);``

Express combines them.

Result:

`` /api/auth + /register``

becomes:

``/api/auth/register``

Similarly:

``/api/auth + /login``

becomes:

/api/auth/login
Visual Flow
```
POST /api/auth/register
          ↓
server.js
          ↓
authRoutes.js
          ↓
register controller
          ↓
database
```
--------

# Jwt authentication 

This package is responsible for:

Create token → jwt.sign()
Verify token → jwt.verify()

```
const authMiddleware = (req, res, next) => {
  try {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};
```

next in the parameter 
Authentication successful,
continue to the next function."
```
Request
 ↓
Auth Middleware
 ↓
next()
 ↓
Controller
 ↓
Response
```

without this request hangs forever

# Understanding split()

Current string:

``Bearer abc123xyz``

Split by space:

authHeader.split(" ")

Result:

["Bearer", "abc123xyz"]

Index:

[0] => "Bearer"
[1] => "abc123xyz"


--------

`` router.use(authMiddleware); ``  in watchlistRoutes 
## What happens without middleware?

Imagine:

router.get("/", getWatchlist);

Anyone can call:

GET /api/watchlist

Even without logging in.

Bad ❌

***What happens with middleware?***

Flow becomes:

Request
 ↓
authMiddleware
 ↓
Controller


```
GET /api/watchlist

↓

authMiddleware

checks token.

If token valid:

next();

↓

getWatchlist()

runs.
```
