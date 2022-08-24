import React from "react";
import ReactDOM from "react-dom";
import Home from "./components/home";

declare global {
  interface Window {
    electronAPI: {
      sendBashCommand: (args: any) => void;
      killProcesses: () => void;
      onData: any;
      saveCwd: (args: { cwd: string }) => void;
      storeData: () => void;
    };
  }
}

function render() {
  ReactDOM.render(<Home />, document.body);
}

render();
