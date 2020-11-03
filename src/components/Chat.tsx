import { Avatar, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, { ReactElement, useEffect, useState } from "react";
import Message from "./Message";
import "./Chat.sass";
import { useParams } from "react-router-dom";
import db from "../common";
import firebase from "firebase";
import { useStateValue } from "../redux/StateProvider";
import moment from "moment";

interface Props {}

export default function Chat({}: Props): ReactElement {
  const [input, setInput] = useState("");
  const { roomId }: { roomId: string } = useParams();
  const [rootName, setRootName] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [{ user }] = useStateValue();

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => {
          setRootName(snapshot.data()?.name ?? "");
        });
      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "asc")
        .onSnapshot((snapshot) => {
          setMessages(snapshot.docs.map((doc) => doc.data()));
        });
    }
    return () => {};
  }, [roomId]);

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInput(event.target.value);
  };
  const sendMessage = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if(input.length){
      if(input.length>100){
        alert('Your message so loooong...')
        return
      }
      db.collection("rooms").doc(roomId).collection("messages").add({
        author: user.displayName,
        content: input,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setInput("");
    }
  };
  const date = moment(
    messages[messages.length - 1]?.timestamp?.toDate() ?? Date.now()
  ).fromNow();
  return (
    <div className="Chat">
      {!rootName ? (
        <div>Empty</div>
      ) : (
        <>
          <div className="Chat__Header">
            <Avatar
              src={`https://avatars.dicebear.com/api/avataaars/${rootName}.svg`}
            />
            <div className="Chat__HeaderInfo">
              <div className="Chat__HeaderName">{rootName}</div>
              <div className="Chat__HeaderLastDate">{date}</div>
            </div>
            <div className="Chat__HeaderRight">
              <IconButton>
                <SearchOutlined />
              </IconButton>
              <IconButton>
                <AttachFile />
              </IconButton>
              <IconButton>
                <MoreVert />
              </IconButton>
            </div>
          </div>
          <div className="Chat__Body">
            {messages.map((message) => (
              <Message
                key={message.content}
                author={message.author}
                timestamp={moment(
                  message.timestamp?.toDate() ?? Date.now()
                ).fromNow()}
                isReceived={user.displayName === message.author}
              >
                {message.content}
              </Message>
            ))}
          </div>
          <div className="Chat__Footer">
            <IconButton>
              <InsertEmoticon />
            </IconButton>
            <form>
              <input type="text" value={input} onChange={onChangeInput} />
              <button type="submit" onClick={sendMessage}>
                Send a message
              </button>
            </form>
            <IconButton>
              <Mic />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}
