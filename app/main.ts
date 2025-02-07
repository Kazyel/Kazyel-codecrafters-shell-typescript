import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

function commandInput() {
    rl.question("$ ", (answer) => {
        if (answer === "exit 0" || answer === "exit") {
            process.exit(0);
        }

        rl.write(`${answer}: command not found\n`);
        commandInput();
    });
}

commandInput();
