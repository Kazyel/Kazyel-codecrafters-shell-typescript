import { rl } from "./main";
import fs from "fs";
import path from "path";

type CommandList = {
    [key: string]: {
        description: string;
        run: (args?: string[]) => boolean | void;
    };
};

function processCommand(userInput: string): [string, ...string[]] {
    if (userInput.length === 0) return ["", ...[""]];

    const [command, ...args] = userInput.split(" ");
    return [command, ...args];
}

export const commandsList: CommandList = {
    echo: {
        description: "Prints a line of text",
        run: (args): void => {
            if (!args) return;
            rl.write(`${args.join(" ")}` + `\n`);
        },
    },
    type: {
        description: "Prints the type of a command",
        run: (args): boolean | void => {
            if (!args) return;

            if (commandsList[args[0]]) {
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
        },
    },
    pwd: {
        description: "Prints the current working directory",
        run: (): void => {
            rl.write(`${process.cwd()}\n`);
        },
    },
    cd: {
        description: "Changes the current working directory",
        run: (args): void => {
            if (!args) return;

            try {
                process.chdir(args[0]);
            } catch (error) {
                rl.write(`cd: ${args[0]}: No such file or directory\n`);
            }
        },
    },
    exit: {
        description: "Exits the shell",
        run: () => process.exit(0),
    },
};

export default processCommand;
