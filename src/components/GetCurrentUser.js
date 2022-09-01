import React, { useEffect } from "react";
import { userState } from "./atoms";
import { useSetRecoilState, useRecoilValue } from "recoil";
const URL = "http://localhost:3000";

function GetCurrentUser() {
  const setUserState = useSetRecoilState(userState);
  const recoilUserState = useRecoilValue(userState);

  useEffect(() => {
    fetch(`${URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setUserState({
            username: data.user.username,
            id: data.user.id,
          });
        });
      } else {
        console.log("nobody is logged in");
      }
    });
  }, []);

  console.log(recoilUserState);

  return <></>;
}

export default GetCurrentUser;
