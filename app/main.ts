import { createInterface } from "readline";

const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
});

async function questionFunc() {
    rl.question("$ ", (answer) => {
        rl.write(`${answer}: command not found\n`);
    });
}

questionFunc();

rl.on("line", () => {
    questionFunc();
});
