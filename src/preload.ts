// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
import { contextBridge, ipcRenderer } from "electron";
import { IPC_EVENTS } from "./constants";

contextBridge.exposeInMainWorld("electronAPI", {
  sendBashCommand: (args: any) => ipcRenderer.send(IPC_EVENTS.EXEC, args),
  killProcesses: () => ipcRenderer.send(IPC_EVENTS.KILL_ALL),
  onData: (callback: any) => ipcRenderer.on("data", callback),
  saveCwd: (args: { cwd: string }) =>
    ipcRenderer.send(IPC_EVENTS.SAVE_CWD, args),
  startupData: () => ipcRenderer.send(IPC_EVENTS.STARTUP_DATA),
});
