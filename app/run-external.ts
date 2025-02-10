import { exec } from "child_process";
import { promisify } from "node:util";
import { rl } from "./main";
import fs from "fs";
import path from "node:path";

const execCallback = promisify(exec);
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

            rl.write(`${stdout}`);

            if (stderr) {
                rl.write(`${stderr}`);
            }

            foundExec = true;

            break;
        }
    }

    return foundExec;
}
