import * as React from "react";
import { useEffect, useState, useRef } from "react";

interface ConsoleOutputProps {
  message: string;
}

const ConsoleOutput = ({ message }: ConsoleOutputProps) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      id={"console"}
      style={{
        maxHeight: "240px",
        maxWidth: "100%",
        overflow: "scroll",
        background: "#0d2339",
        fontFamily: "monospace",
        color: "#29e184",
        fontSize: "small",
        padding: "12px",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: message }} />
      <div ref={bottomRef} />
    </div>
  );
};

export default ConsoleOutput;
