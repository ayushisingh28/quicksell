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

const Board = (props) => {
  const [todono, settodono] = useState();
  let usersdata = [""];
  const [tick, setTick] = useState([{ id: "CAM" }]);
  const [todolist, settodolist] = useState([]);
  const [inProgressno, setinProgressno] = useState(0);
  const [doneno, setdoneno] = useState(0);
  const [cancelled, setcancelled] = useState(0);
  const [backlog, setbacklog] = useState(0);

  // const [count, setCount] = useState(0);
  // let todonum = 0;
  const [todonum, setTodonum] = useState(0);

  // const [first, setfirst] = useState(second)

  useEffect(() => {
    hello();
    count();
  }, []);

  async function hello() {
    try {
      const response = await fetch(
        "https://api.quicksell.co/v1/internal/frontend-assignment"
      );

      const result = await response.json();

      setTick(result.tickets);

      console.log("tickets", tick);

      // settodolist( tick.filter((ele) => ele.status === 'Todo')) ;
      // setTimeout(() => {

      // }, 2000);

      // // setTodonum((prevTodonum) => {
      // //     const todolist = tick.filter((ele) => ele.status === 'Todo');
      // //     console.log(todolist.length); // Now this will give you the expected result
      // //     return todolist.length; // Return the new value for todonum
      // //   });
      // //   console.log(todolist.length);

      // //     console.log(todolist);
      // console.log(todolist.length);
      // // todonum = todolist.length;
      // setTodonum(todolist.length);
      // console.log(todonum);
    } catch (error) {
      console.error("Error:", error);
    }
  }
  function count() {
    tick.map((ticket) => {
      if (ticket.status === "Todo") {
        settodono(todono + 1);
        console.log("smd");
      }
      if (ticket.status === "In Progress") setinProgressno(inProgressno + 1);
      if (ticket.status === "Done") setdoneno(doneno + 1);
      if (ticket.status === "cancelled") setcancelled(cancelled + 1);
      if (ticket.status === "backlog") setbacklog(backlog + 1);

      console.log("todono");
    });
  }

  return (
    <div className="Board">
      <div className="boardHeading">
        <img src={nopriorityimg} className="headingImg" alt=""></img>
        <p className="cText" style={{ width: "190px" }}>
          No Priority
        </p>
        <p className="cText">{backlog}</p>
        <div className="boardHeading" id="pluske">
          {/* <img src={plusmore} className='headingImg' alt=''></img> */}
          <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <img src={addIcon} className="headingImg" alt="Add" />
            <img src={menuIcon} className="headingImg" alt="Menu" />
          </div>
        </div>
      </div>

      <div className="Cards">
        {tick.length > 0 &&
          tick.map((ticket) => {
            return ticket.priority === 0 && <Card ticket={ticket}></Card>;
          })}
      </div>
    </div>
  );
};

export default Board;
