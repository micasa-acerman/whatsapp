import { Avatar } from "@material-ui/core";
import React, { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import db from "../common";
import "./SidebarChat.sass";
interface Props {
  addNewChat?: boolean;
  name?: string;
  id?: string;
}

export default function SidebarChat({
  addNewChat = false,
  name = "",
  id = "",
}: Props): ReactElement {
  const [seed, setSeed] = useState("");
  const [lastMessage, setLastMessage] = useState('')
  const createChat = () => {
    const name = prompt("Please enter name for chat");
    setSeed(`${Math.random()}`);
    if (name) {
      if(name.length > 20){
        alert('Room name is sooo long...')
        return
      }
      db.collection("rooms").add({
        name,
      });
    }
  };
  useEffect(()=>{
    if(id){
      db.collection('rooms').doc(id).collection('messages').orderBy('timestamp','desc')
      .onSnapshot(snapshot=>{
        const msg = snapshot.docs.map(doc=>doc.data())
        setLastMessage(msg[0]?.content ?? "")
      })
    }
  },[])


  if (addNewChat) {
      return (
          <div onClick={createChat} className="SidebarChat__AddNew">
              <h2>Add new chat</h2>
          </div>
      )
  } else {
    return (
      <Link to={`/rooms/${id}`} className="SidebarChat__Link">
      <div className="SidebarChat">
        <Avatar src={`https://avatars.dicebear.com/api/avataaars/${name}.svg`} />
        <div className="SidebarChat__Info">
          <h3 className="SidebarChat__Nickname">{name}</h3>
          <p className="SidebarChat__Message">{lastMessage}</p>
        </div>
      </div>
      </Link>
    );
  }
}
