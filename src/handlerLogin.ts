import { CommandHandler } from "./commands"; // or same file
import { setUser } from "./config";

export const handlerLogin: CommandHandler = (cmdName, ...args) => {
	if (args.length === 0) {
		throw new Error("login command requires a username");
	}

	const username = args[0];
	setUser(username);
	console.log(`Current user set to ${username}`);
};
