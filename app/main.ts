import { createInterface } from "readline";
import processCommand, { echo, type } from "./commands";

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function commandInput() {
    rl.question("$ ", (userCommand) => {
        const [command, ...args] = processCommand(userCommand);

        if (command === "") {
            commandInput();
            return;
        }

        switch (command) {
            case "echo":
                echo([...args]);
                commandInput();
                return;

            case "type":
                if (args.length === 0) {
                    commandInput();
                    return;
                }

                const commandExists = type([...args]);

                if (commandExists === false)
                    rl.write(`${args.join(" ")}: not found\n`);

                commandInput();
                return;

            case "exit":
                process.exit(0);

            default:
                rl.write(`${userCommand}: command not found\n`);
                commandInput();
        }
    });
}

commandInput();
