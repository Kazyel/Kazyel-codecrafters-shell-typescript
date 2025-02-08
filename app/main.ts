import { createInterface } from "readline";
import processCommand, { echo, type } from "./commands";

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function commandInput() {
    rl.question("$ ", (userCommand) => {
        const [command, ...args] = processCommand(userCommand);

        if (!command) {
            commandInput();
            return;
        }

        if (command === "echo") {
            echo([...args]);
            commandInput();
            return;
        }

        if (command === "type") {
            if (args.length === 0) {
                // rl.write("type: missing operand\n");
                commandInput();
                return;
            }

            const commandExists = type([...args]);

            if (commandExists === false)
                rl.write(`${args.join(" ")}: not found\n`);

            commandInput();
            return;
        }

        if (command + " 0" === "exit 0" || command === "exit") {
            process.exit(0);
        }

        rl.write(`${userCommand}: command not found\n`);
        commandInput();
    });
}

commandInput();
