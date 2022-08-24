import React, { useEffect, useState } from "react";

const RunButton = ({
  disabled,
  command,
  label,
  setRunning,
  cwd,
}: {
  disabled: boolean;
  command: string;
  label: string;
  setRunning: any;
  cwd: string;
}) => {
  const onRun = () => {
    window.electronAPI.sendBashCommand({ cmnd: command, cwd: cwd });
    setRunning(true);
  };

  return (
    <button onClick={onRun} disabled={disabled}>
      {label}
    </button>
  );
};

interface CwdInputProps {
  currentCwd: string;
  setCwd: (text: string) => void;
}

const CwdInput = ({ currentCwd, setCwd }: CwdInputProps) => {
  const handleInputChange = (event: any) => {
    event.preventDefault();
    setCwd(event.target.value);
  };

  return (
    <form>
      <label>
        Current working directory:
        <input
          type="text"
          value={currentCwd}
          onChange={handleInputChange}
        ></input>
      </label>
    </form>
  );
};

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
        <RunButton
          disabled={!!running}
          command={"sampleReact"}
          label={"Run a random react app"}
          setRunning={setRunning}
          cwd={cwd}
        />
        <RunButton
          disabled={!!running}
          command={"doctoRails"}
          label={"Run doctolib rails server"}
          setRunning={setRunning}
          cwd={cwd}
        />
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
