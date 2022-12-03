import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";



function App() {
  const [toolings, setToolings] = useState([]);

useEffect(() => {
  axios.get("http://localhost:5000/api/toolings").then((response) => {
    console.log(response);
    setToolings(response.data);
  });
},[]);
  return (
    <div>
      <Header as="h2" icon="users" />
      <List>
        {toolings.map((tooling: any) => (
          <List.Item key={tooling.id}>{tooling.psNumber}</List.Item>
        ))}
      </List>
    </div>
  );
}

export default App;
