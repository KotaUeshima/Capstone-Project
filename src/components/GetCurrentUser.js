import React, { useEffect } from 'react'
import { useSetRecoilState } from 'recoil'
import { userState } from '../utils/atoms'

import URL from '../utils/url.js'

function GetCurrentUser() {
  const setUserState = useSetRecoilState(userState)

  useEffect(() => {
    fetch(`${URL}/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => {
      if (res.ok) {
        res.json().then(data => {
          setUserState({
            username: data.user.username,
            id: data.user.id,
          })
        })
      }
    })
  }, [setUserState])

  return <></>
}

export default GetCurrentUser
