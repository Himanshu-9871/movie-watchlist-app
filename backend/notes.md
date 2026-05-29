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
