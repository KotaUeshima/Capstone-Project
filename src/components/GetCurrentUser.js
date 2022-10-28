import React, { useEffect } from "react";
import { userState } from "./atoms";
import { useSetRecoilState } from "recoil";

import URL from "./URL.js";

function GetCurrentUser() {
  const setUserState = useSetRecoilState(userState);

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
      }
    });
  }, [setUserState]);

  return <></>;
}

export default GetCurrentUser;
