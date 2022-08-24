import React from "react";

export interface RunButtonProps {
  disabled: boolean;
  command: string;
  setRunning: (state: boolean) => void;
  cwd: string;
}

const RunButton = ({ disabled, command, setRunning, cwd }: RunButtonProps) => {
  const onRun = () => {
    window.electronAPI.sendBashCommand({ cmnd: command, cwd: cwd });
    setRunning(true);
  };

  return (
    <button onClick={onRun} disabled={disabled}>
      Icon
    </button>
  );
};

export default RunButton;
