import { rl } from "./main";

const commandsList = ["echo", "type", "exit"];

function processCommand(userInput: string): [string, ...string[]] {
    if (userInput.length === 0) return ["", ...[""]];

    const [command, ...args] = userInput.split(" ");
    return [command, ...args];
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
    return false;
}

export default processCommand;
