import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function processCommand(userInput: string) {
    const [command, ...args] = userInput.split(" ");
    return [command, args.join(" ")];
}

function commandInput() {
    rl.question("$ ", (userCommand) => {
        const [command, ...args] = processCommand(userCommand);

        if (command + " 0" === "exit 0" || command === "exit") {
            process.exit(0);
        }

        if (command === "echo") {
            rl.write(args + `\n`);
            commandInput();
            return;
        }

        rl.write(`${userCommand}: command not found\n`);
        commandInput();
    });
}

commandInput();
