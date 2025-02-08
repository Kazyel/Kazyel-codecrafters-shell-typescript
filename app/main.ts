import { createInterface } from "readline";
import processCommand, {
    commandsList,
    echo,
    externalCommand,
    type,
} from "./commands";

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

        if (!commandsList.includes(command)) {
            const externalCommandExists = externalCommand(command, [...args]);

            if (externalCommandExists === false) {
                rl.write(`${command}: command not found\n`);
            }

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
                rl.write(`${command}: command not found\n`);
                commandInput();
                return;
        }
    });
}

commandInput();
