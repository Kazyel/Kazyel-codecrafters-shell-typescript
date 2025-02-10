import { createInterface } from "readline";
import processCommand, { commandsList } from "./commands";
import { runExternalCommand } from "./run-external";

export const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function commandInput() {
    rl.question("$ ", async (userCommand) => {
        const [command, ...args] = processCommand(userCommand);
        const { echo, type, exit, pwd } = commandsList;

        if (!command) {
            commandInput();
            return;
        }

        switch (command) {
            case "echo":
                echo.run([...args]);
                commandInput();
                return;

            case "type":
                if (args.length === 0) {
                    commandInput();
                    return;
                }

                const commandExists = type.run([args[0]]);

                if (commandExists === false)
                    rl.write(`${args.join(" ")}: not found\n`);

                commandInput();
                return;

            case "pwd":
                pwd.run();
                commandInput();
                return;

            case "exit":
                exit.run();

            default:
                const externalCommandExists = await runExternalCommand(
                    command,
                    [...args]
                );

                if (!externalCommandExists) {
                    rl.write(`${command}: command not found\n`);
                }

                commandInput();
                return;
        }
    });
}

commandInput();
