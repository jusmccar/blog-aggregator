import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerLogin } from "./handlerLogin";

function main() {
	const registry: CommandsRegistry = {};

	registerCommand(registry, "login", handlerLogin);

	const args = process.argv.slice(2);

	if (args.length < 1) {
		console.error("Error: not enough arguments provided");
		process.exit(1);
	}

	const [cmdName, ...cmdArgs] = args;

	try {
		runCommand(registry, cmdName, ...cmdArgs);
	} catch (err) {
		if (err instanceof Error) {
			console.error(`Error: ${err.message}`);
		} else {
			console.error("Unknown error");
		}
		process.exit(1);
	}
}

main();
