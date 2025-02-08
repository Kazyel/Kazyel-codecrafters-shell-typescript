import { spawn, exec } from "child_process";
import { promisify } from "node:util";
import { rl } from "./main";
import fs from "fs";
import path from "path";

export const commandsList = ["echo", "type", "exit"];

const execCallback = promisify(exec);

function processCommand(userInput: string): [string, ...string[]] {
    if (userInput.length === 0) return ["", ...[""]];

    const [command, ...args] = userInput.split(" ");
    return [command, ...args];
}

export async function runExternalCommand(
    command: string,
    args: string[]
): Promise<boolean> {
    const pathEnv = process.env.PATH;
    const existingPaths = pathEnv!.split(":");
    let foundExec = false;

    for (const directory of existingPaths) {
        const filePath = path.join(directory, command);

        if (fs.existsSync(filePath)) {
            const { stdout, stderr } = await execCallback(
                command + " " + args.join(" ")
            );

            rl.write(`\n${stdout}`);

            if (stderr) {
                rl.write(`\n${stderr}`);
            }

            foundExec = true;
            break;
        }
    }

    return foundExec;
}

export function echo(args: string[]): void {
    if (args.length === 0) return;

    rl.write(`${args.join(" ")}` + `\n`);
}

export function type(args: string[]): boolean {
    if (commandsList.includes(args[0])) {
        rl.write(`${args[0]} is a shell builtin\n`);
        return true;
    }

    const pathEnv = process.env.PATH;
    const existingPaths = pathEnv!.split(":");

    for (const directory of existingPaths) {
        const filePath = path.join(directory, args[0]);

        if (fs.existsSync(filePath)) {
            rl.write(`${args[0]} is ${filePath} \n`);
            return true;
        }
    }

    return false;
}

export default processCommand;
