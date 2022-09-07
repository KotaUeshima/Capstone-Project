import React, { useEffect, useState } from "react";
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from "cdbreact";
import { ListGroup } from "react-bootstrap";
import { useRecoilValue, useRecoilState } from "recoil";
import { userState, showSidebar } from "../components/atoms";
import { IoIosArrowDropleftCircle } from "react-icons/io";
const URL = "http://localhost:3000";

function Sidebar({ goToSelectedSong }) {
  const [show, setShow] = useRecoilState(showSidebar);
  const recoilState = useRecoilValue(userState);
  const [mySongs, setMySongs] = useState([]);

  useEffect(() => {
    fetch(`${URL}/user_songs/${recoilState.id}`).then((res) => {
      if (res.ok) {
        res.json().then(setMySongs);
      }
    });
    setShow(false);
  }, []);

  return (
    <>
      {show ? (
        <div
          style={{
            display: "flex",
            height: "93vh",
            zIndex: "10",
            position: "absolute",
            right: "0",
            top: "3.5rem",
            overflow: "scroll initial",
          }}
        >
          <CDBSidebar textColor="#fff" backgroundColor="#333">
            <CDBSidebarHeader
              onClick={() => setShow(false)}
              prefix={<i className="fa fa-bars fa-large"></i>}
            >
              {`${recoilState.username}'s songs`}
            </CDBSidebarHeader>
            <CDBSidebarContent className="sidebar-content">
              <CDBSidebarMenu>
                <div>
                  {mySongs.map((song) => {
                    return (
                      <ListGroup.Item
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                        onClick={(e) => {
                          let listItem = e.target;
                          while (listItem.nodeName != "LI") {
                            listItem = listItem.parentNode;
                          }
                          listItem.style.backgroundColor = "#EFEFEF";
                          goToSelectedSong(song);
                        }}
                      >
                        <div className="ms-2 me-auto">
                          <div className="fw-bold">{song.title}</div>
                          {song.artist}
                        </div>
                        <img height="20%" width="20%" src={song.image_url} />
                      </ListGroup.Item>
                    );
                  })}
                </div>
              </CDBSidebarMenu>
            </CDBSidebarContent>
          </CDBSidebar>
        </div>
      ) : null}
    </>
  );
}

export default Sidebar;
