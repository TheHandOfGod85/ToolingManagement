import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tooling } from "./models/tooling";
import NavBar from "./NavBar";
import ToolingDashboard from "../../features/toolings/dashboard/ToolingDashboard";

function App() {
  const [toolings, setToolings] = useState<Tooling[]>([]);

  useEffect(() => {
    axios
      .get<Tooling[]>("http://localhost:5000/api/toolings")
      .then((response) => {
        console.log(response);
        setToolings(response.data);
      });
  }, []);
  return (
    <>
      <NavBar />
      <ToolingDashboard toolings={toolings}/>
    </>
  );
}

export default App;
