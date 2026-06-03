# Structure of the frontend


```
src/
│
├── pages/
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Home.jsx
│   └── Watchlist.jsx
│
├── components/
│   ├── Navbar.jsx
│   ├── MovieCard.jsx
│   └── ProtectedRoute.jsx
│
├── services/
│   └── api.js
│
├── App.jsx
├── main.jsx
└── index.css
```

**step 1**

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

Suppose in another file:

import api from "../services/api";

Now you can do:

api.get("/movies");

Axios internally converts it to:

http://localhost:5000/api/movies


--------

# Routing between react components 

import { Routes, Route } from "react-router-dom";

We're importing two components:

Routes

Acts like a container for all routes.

Think:
```
Routes
 ├── Home Route
 ├── Login Route
 ├── Register Route
 └── Watchlist Route
 ```

``Route``
 ``Defines one specific path.``

Example:

***<Route path="/login" element= { ``<Login />``} />

means:

If URL = /login
Show Login component


<Route path="/" element={``<Home/>``}></Route>  

this means path is home and element means render the home component
