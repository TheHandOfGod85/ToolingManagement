import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import { List, ListItem, Typography } from "@mui/material";
import GroupIcon from "@mui/icons-material/Group";

function App() {
  const [toolings, setToolings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/toolings").then((response) => {
      console.log(response);
      setToolings(response.data);
    });
  }, []);
  return (
    <div>
      <Typography variant="h5">
        <GroupIcon color="primary" fontSize="large" /> Tooling list
      </Typography>
      <List>
        {toolings.map((tooling: any) => (
          <ListItem key={tooling.id}>{tooling.psNumber}</ListItem>
        ))}
      </List>
    </div>
  );
}

export default App;
