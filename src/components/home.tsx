import React, { useEffect, useState } from "react";
import CwdInput from "./CwdInput";
import RunnableProcess from "./RunnableProcess";
import Button from "@mui/material/Button";
import { Stack } from "@mui/material";

const Home = () => {
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [cwd, setCwd] = useState("/Users/USER/doctolib");

  const onKill = () => {
    window.electronAPI.killProcesses();
    setMessage("");
    setRunning(false);
  };

  useEffect(() => {
    window.electronAPI.onData((_event: any, data: any) => {
      const value = JSON.parse(data);
      switch (value.type) {
        case "process-data":
          setMessage((prev) => `${prev}<div>${value.payload}</div>`);
          break;
        case "store-data":
          setCwd(value.payload?.cwd || "");
      }
    });
  }, []);

  useEffect(() => {
    window.electronAPI.saveCwd({ cwd: cwd });
  }, [cwd]);

  return (
    <Stack spacing={2}>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <CwdInput currentCwd={cwd} setCwd={setCwd} />
      </div>
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
        Kill all processes
      </Button>
    </Stack>
  );
};

export default Home;
