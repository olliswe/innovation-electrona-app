import React, { useEffect, useState } from "react";
import CwdInput from "./CwdInput";
import RunnableProcess from "./RunnableProcess";
import Button from "@mui/material/Button";

const Home = () => {
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [cwd, setCwd] = useState("/Users/kriti/doctolib");

  const onKill = () => {
    window.electronAPI.killProcesses();
    setMessage("");
    setRunning(false);
  };

  useEffect(() => {
    window.electronAPI.onProcessData((_event: any, value: any) => {
      setMessage((prev) => `${prev}<div>${value}</div>`);
    });
  }, []);

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CwdInput currentCwd={cwd} setCwd={setCwd} />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <RunnableProcess
          label={"Run doctolib rails server"}
          message={message}
          buttonProps={{
            disabled: !!running,
            command: "doctoRails",
            setRunning: setRunning,
            cwd: cwd,
          }}
        ></RunnableProcess>
        <Button onClick={onKill} disabled={!running} variant={"contained"}>
          Kill processes
        </Button>
      </div>
    </div>
  );
};

export default Home;
