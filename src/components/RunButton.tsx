import React from "react";
import { IconButton } from "@mui/material";
import { PlayCircle, StopCircle } from "@mui/icons-material";

export interface RunButtonProps {
  disabled: boolean;
  command: string;
  setRunning: (state: boolean) => void;
  cwd: string;
}

const RunButton = ({ disabled, command, setRunning, cwd }: RunButtonProps) => {
  const onRun = (event: any) => {
    event.stopPropagation();
    window.electronAPI.sendBashCommand({ cmnd: command, cwd: cwd });
    setRunning(true);
  };

  return (
    <IconButton
      onClick={onRun}
      disabled={disabled}
      style={{ marginLeft: "auto" }}
      color="success"
    >
      {disabled ? <StopCircle /> : <PlayCircle />}
    </IconButton>
  );
};

export default RunButton;
