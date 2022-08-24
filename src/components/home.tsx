import React, { useEffect, useState } from "react";

const RunButton = ({
  disabled,
  command,
  label,
  setRunning,
}: {
  disabled: boolean;
  command: string;
  label: string;
  setRunning: any;
}) => {
  const onRun = () => {
    window.electronAPI.sendBashCommand({ cmnd: command });
    setRunning(true);
  };

  return (
    <button onClick={onRun} disabled={disabled}>
      {label}
    </button>
  );
};

const Home = () => {
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("");

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
    <div style={{ display: "flex", flexDirection: "column" }}>
      <RunButton
        disabled={!!running}
        command={"sampleReact"}
        label={"Run a random react app"}
        setRunning={setRunning}
      />
      <RunButton
        disabled={!!running}
        command={"doctoRails"}
        label={"Run doctolib rails server"}
        setRunning={setRunning}
      />
      <button onClick={onKill} disabled={!running}>
        Kill process
      </button>
      <div style={{ height: 1000, overflow: "scroll" }}>
        <div dangerouslySetInnerHTML={{ __html: message }} />
      </div>
    </div>
  );
};

export default Home;
