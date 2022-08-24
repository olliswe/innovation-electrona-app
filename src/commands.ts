import { spawn, ChildProcess } from "child_process";
import { BrowserWindow } from "electron";
import { homedir} from "os";

const getWindow = () => BrowserWindow.getAllWindows()[0];

const PROJECTS_PATH = homedir() + "/Projects"

const COMMAND_OPTIONS = {
  sampleReact: {
    command: "npm",
    args: ["start"],
    options: {
      cwd: PROJECTS_PATH + "/whathappenedtovirgil",
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
      cwd: PROJECTS_PATH + "/doctolib",
    },
  },
};

export function run(command: string, cwd: string): ChildProcess {
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

  return newProcess;
}
