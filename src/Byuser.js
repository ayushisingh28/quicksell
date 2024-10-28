/* eslint-disable no-unused-vars */
import React from "react";
import todo from "./icons_FEtask/To-do.svg";
import { useEffect, useState } from "react";
import Card from "./Card.js";
import "./Status.css";

import addIcon from "./icons_FEtask/add.svg";
import menuIcon from "./icons_FEtask/3 dot menu.svg";

import done from "./icons_FEtask/Done.svg";
import Cancelled from "./icons_FEtask/Cancelled.svg";
import backlogimg from "./icons_FEtask/Backlog.svg";
import inprogressimg from "./icons_FEtask/in-progress.svg";
import nopriorityimg from "./icons_FEtask/No-priority.svg";
import urgentimg from "./icons_FEtask/SVG - Urgent Priority colour.svg";
import highimg from "./icons_FEtask/Img - High Priority.svg";
import mediumimg from "./icons_FEtask/Img - Medium Priority.svg";
import lowimg from "./icons_FEtask/Img - Low Priority.svg";
import CardUser from "./Card1.js";

import usr1 from "./usr-1.png";
import usr2 from "./usr-2.png";
import usr3 from "./usr-3.png";
import usr4 from "./usr-4.png";
import usr5 from "./usr-5.png";
import usr6 from "./usr-6.png";
import usr7 from "./usr-7.png";

const Byuser = (props) => {
  const [todono, settodono] = useState();
  let usersdata = [""];
  let available = true;
  const [tick, setTick] = useState([{ id: "CAM" }]);
  const [users, setusers] = useState([{ id: "CAM" }]);

  const [usermass, setusermass] = useState([]);
  const [Order, setOrder] = useState(localStorage.getItem("order"));

  useEffect(() => {
    hello();
  }, []);

  useEffect(() => {
    count();
  }, [tick, users, props.order]);

  async function hello() {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );
      const result = await response.json();
      setTick(result.tickets);
      setusers(result.users);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  function count() {
    let masspre = [];
    users.forEach((user) => {
      let temp = [];
      tick.forEach((ticket) => {
        if (ticket.userId === user.id) {
          temp.push(ticket);
        }
      });
      if (props.order === "Title") {
        temp.sort((a, b) => a.title.localeCompare(b.title));
      } else {
        temp.sort((b, a) => parseInt(a.priority) - parseInt(b.priority));
      }
      masspre.push(temp);
    });
    setusermass(masspre);
  }

  const usrImageMap = {
    "usr-1": usr1,
    "usr-2": usr2,
    "usr-3": usr3,
    "usr-4": usr4,
    "usr-5": usr5,
    "usr-6": usr6,
    "usr-7": usr7,
  };

  return (
    <div className="Boards">
      {usermass.map((user) => {
        return (
          <div className="Board">
            <div className="boardHeading">
              <img
                src={(user[0] && usrImageMap[user[0].userId]) || usr1}
                className="headingImg2"
                alt=""
              ></img>
              {users.map((item) => {
                if (user[0] && item.id === user[0].userId) {
                  available = item.available;
                  return (
                    <p className="cText" style={{ width: "500px" }}>
                      {item.name}
                    </p>
                  );
                }
                return null;
              })}
              <p className="cText">{user.length}</p>
              <div className="boardHeading" id="pluske">
                <div style={{ display: "flex", alignItems: "center", gap: "5px" }} >
                  <img src={addIcon} className="headingImg" alt="Add" />
                  <img src={menuIcon} className="headingImg" alt="Menu" />
                </div>
              </div>
            </div>
            <div className="Cards">
              {user.length > 0 &&
                user.map((ticket) => {
                  return (
                    <CardUser ticket={ticket} available={available}></CardUser>
                  );
                })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Byuser;
