import { Avatar, IconButton } from "@material-ui/core";
import {
  ChatBubble,
  DonutLarge,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { ReactElement, useEffect, useState } from "react";
import db from "../common";
import { useStateValue } from "../redux/StateProvider";
import "./Sidebar.sass";
import SidebarChat from "./SidebarChat";

interface Props {}

function Sidebar({}: Props): ReactElement {
  const [rooms, setRooms] = useState<any[]>([]);
  const [{user},] = useStateValue() 
  console.log(user);
  
  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) => {
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
    return () => {
      unsubscribe()
    }
  }, []);

  return (
    <div className="Sidebar">
      <div className="Sidebar__Header">
        <div className="Sidebar__UserInfo">
          <Avatar src={user.photoURL} />
          <span>{user.displayName}</span>
        </div>
        <div className="Sidebar_HeaderRight">
          <IconButton>
            <DonutLarge />
          </IconButton>
          <IconButton>
            <ChatBubble />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="Sidebar__Search">
        <div className="Sidebar__SearchContainer">
          <SearchOutlined />
          <input placeholder="Search or start new chat" type="text" />
        </div>
      </div>
      <div className="Sidebar__Chats">
        <SidebarChat addNewChat={true}/>
        {rooms.map((r) => (
          <SidebarChat
            key={r.id}
            name={r.data.name}
            id={r.id}
          />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
