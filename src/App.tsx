import React, { useState } from "react";
import "./App.sass";
import Chat from "./components/Chat";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Login from "./components/Login";
import { useStateValue } from "./redux/StateProvider";

function App() {
  const [{user},] = useStateValue()

  return (
    <div className="App">
      {!user ?(
        <Login />
      ):(
        <div className="App__Wrapper">
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
      </div>
      )
      }

    </div>
  );
}

export default App;
