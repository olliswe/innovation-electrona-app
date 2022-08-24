import { spawn } from "child_process";
import { activeProcesses } from "./index";
import { BrowserWindow } from "electron";

const getWindow = () => BrowserWindow.getAllWindows()[0];

const COMMAND_OPTIONS = {
  sampleReact: {
    command: "npm",
    args: ["start"],
    options: {
      cwd: "/Users/oliveriyer/Projects/whathappenedtovirgil",
      env: {
        ...process.env,
        PORT: "3030",
      },
    },
  },
  doctoRails: {
    command: "bin/dev",
    args: ["server"],
    options: {
      cwd: "/Users/oliveriyer/Projects/doctolib",
    },
  },
};

export async function runCommand(command: string, cwd: string) {
  // const { stdout, stderr } = await execPromisified(command);
  // console.log({ stdout, stderr });

  // @ts-ignore
  const commandOption = COMMAND_OPTIONS[command];
  console.log(cwd);
  const newProcess = spawn(commandOption.command, commandOption.args, {
    ...commandOption.options,
    cwd: cwd,
    detached: true,
  });

  activeProcesses.push(newProcess);

  let scriptOutput = "";

  newProcess.stdout.setEncoding("utf8");
  newProcess.stdout.on("data", function (data) {
    //Here is where the output goes

    console.log("stdout: " + data);

    getWindow().webContents.send("process-data", data.toString());

    data = data.toString();
    scriptOutput += data;
  });

  newProcess.stderr.setEncoding("utf8");
  newProcess.stderr.on("data", function (data) {
    //Here is where the error output goes

    console.log("stderr: " + data);

    data = data.toString();
    scriptOutput += data;
  });

  newProcess.on("close", function (code) {
    //Here you can get the exit code of the script

    console.log("closing code: " + code);

    console.log("Full output of script: ", scriptOutput);
  });
}
