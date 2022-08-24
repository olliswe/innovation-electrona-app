import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/home";

declare global {
  interface Window {
    electronAPI: {
      sendBashCommand: (args: any) => void;
      killProcesses: () => void;
      onProcessData: any;
    };
  }
}

function render() {
  ReactDOM.render(<Home />, document.body);
}

render();
