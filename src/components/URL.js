import React from "react";

let URL;
if (process.env.NODE_ENV == "development") {
  URL = "http://localhost:3000";
} else {
  URL = "https://globify-backend.herokuapp.com";
}

export default URL;
