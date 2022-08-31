import React, { useEffect } from "react";
const URL = "http://localhost:3000";

function GetCurrentUser() {
  useEffect(() => {
    fetch(`${URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(console.log);
  });

  return <div>GetCurrentUser</div>;
}

export default GetCurrentUser;
