import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RunButton, { RunButtonProps } from "./RunButton";

interface RunnableProcessProps {
  label: string;
  message: string;
  buttonProps: RunButtonProps;
}

const RunnableProcess = ({
  label,
  message,
  buttonProps,
}: RunnableProcessProps) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography>{label}</Typography>
          <RunButton {...buttonProps} />
        </div>
      </AccordionSummary>
      <AccordionDetails>{message}</AccordionDetails>
    </Accordion>
  );
};

export default RunnableProcess;
