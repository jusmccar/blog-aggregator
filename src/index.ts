import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerLogin } from "./handlerLogin";
import { handlerRegister } from "./handlerRegister";
import { handlerReset } from "./handlerReset";
import { handlerUsers } from "./handlerUsers";

async function main() {
	const registry: CommandsRegistry = {};

	registerCommand(registry, "register", handlerRegister);
	registerCommand(registry, "login", handlerLogin);
	registerCommand(registry, "users", handlerUsers);
	registerCommand(registry, "reset", handlerReset);

	const args = process.argv.slice(2);

	if (args.length < 1) {
		console.error("Error: not enough arguments provided");
		process.exit(1);
	}

	const [cmdName, ...cmdArgs] = args;

	try {
		await runCommand(registry, cmdName, ...cmdArgs);
	} catch (err) {
		if (err instanceof Error) {
			console.error(`Error: ${err.message}`);
		} else {
			console.error("Unknown error");
		}
		process.exit(1);
	}

	process.exit(0);
}

main();
