import React, { useEffect, useState } from "react";
import CwdInput from "./CwdInput";
import RunnableProcess from "./RunnableProcess";
import RunButton from "./RunButton";

const Home = () => {
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");
  const [cwd, setCwd] = useState("/Users/oliveriyer/Projects/doctolib");

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
    <>
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
        <button onClick={onKill} disabled={!running}>
          Kill process
        </button>
        <div style={{ height: 1000, overflow: "scroll" }}>
          <div dangerouslySetInnerHTML={{ __html: message }} />
        </div>
      </div>
    </>
  );
};

export default Home;
