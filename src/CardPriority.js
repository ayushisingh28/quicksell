import React, { useEffect, useState } from 'react';
import './Card.css';
import logo from './logo.svg';

// import priority from './icons_FEtask/priority.svg';
import tag from './icons_FEtask/tag.png'
import img0 from './icons_FEtask/No-priority.svg'
import img4 from './icons_FEtask/SVG - Urgent Priority colour.svg'
import img3 from './icons_FEtask/Img - High Priority.svg'
import img2 from './icons_FEtask/Img - Medium Priority.svg'
import img1 from './icons_FEtask/Img - Low Priority.svg'
import done from './icons_FEtask/Done.svg'
import Cancelled from './icons_FEtask/Cancelled.svg'
import backlogimg from './icons_FEtask/Backlog.svg'
import inprogressimg from './icons_FEtask/in-progress.svg'
import todo from './icons_FEtask/To-do.svg'
import usr1 from './usr-1.png'
import usr2 from './usr-2.png'
import usr3 from './usr-3.png'
import usr4 from './usr-4.png'
import usr5 from './usr-5.png'
import usr6 from './usr-6.png'
import usr7 from './usr-7.png'

// import img from 

const CardPriority = (props) => {
    // let available = true;
    const [available, setavailable] = useState(false);
    // console.log({props});
    let imgt=`imgr${props.ticket.priority.toString()}`;
    // console.log(imgt);
    let dotuser;
    
    const [users, setusers] = useState([]);
    const [tick, setTick] = useState([]);

    useEffect(() => {

        hello();
        // count();


    }, []);

    async function hello() {
        try {
            const response = await fetch("https://api.quicksell.co/v1/internal/frontend-assignment");

            const result = await response.json();

        setTick(result.tickets);
        setusers(result.users);
        } catch (error) {
            console.error("Error:", error);
        }


    }
    const priorityImageMap = {
        0: img0,
        1: img1,
        2: img2,
        3: img3,
        4: img4,
      };
    const statusImageMap={
        "Todo": todo,
        "In progress":inprogressimg,
        "Backlog":backlogimg,
        "Done":done,
        "Cancelled":Cancelled,

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
      useEffect(() => {
        users.map((user) => {
                               
            if(
                props.ticket &&
                 user.id === props.ticket.userId){
                    setavailable(user.available);
                
            }  })   
      }, [users])
      
      
      const usrImage=usrImageMap[props.ticket.userId]||usr1;
      const imgSrc = priorityImageMap[props.ticket.priority] || img0;
      const statusImgSrc=statusImageMap[props.ticket.status]||todo;
    if(available===true){
        dotuser=<div className='availableUser' />;

    }else{
        dotuser=<div className='notavailableUser' />;
    }
   
    

    return (
        <div className='cardBox'>
            <div className='cardBoxrow'>
                <div className='cardBoxin'>
                    <text className='cardId'>{props.ticket.id}</text>
                    <text className='cardTitle'><img  src={statusImgSrc}></img>{props.ticket.title}</text>
                </div >
                <div style={{ height: "38px" }}>
                    <img className='userImg' src={usrImage} alt='' />
                    {dotuser}
                </div>
            </div>


            <div className='lowerBox'>
                <div className='priorityBox'><img className='priorityImg' src={imgSrc} alt='logo' /></div>

                <div className='tagBox'>
                    <img className='tagImg' src={tag} alt='logo' />
                    <tag className='tagText'>{props.ticket.tag}</tag>
                </div>

            </div>
        </div>
    );
};

export default CardPriority;