import { IconButton, TextField } from "@mui/material";
import React from "react";
import SaveIcon from "@mui/icons-material/Save";

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
    <>
      <TextField
        id="outlined-name"
        label="Current working directory"
        value={currentCwd}
        onChange={handleInputChange}
        style={{ width: "100%" }}
      />
      <IconButton
        color="success"
        onClick={(event) => {
          window.electronAPI.saveCwd({ cwd: currentCwd });
        }}
      >
        <SaveIcon />
      </IconButton>
    </>
  );
};

export default CwdInput;
