import { TextField } from "@mui/material";
import React from "react";

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
    <TextField
      id="outlined-name"
      label="Current working directory"
      value={currentCwd}
      onChange={handleInputChange}
    />
  );
};

export default CwdInput;
