import { getUser } from "src/lib/db/queries/users";
import { CommandHandler } from "./commands";
import { setUser } from "./config";

export const handlerLogin: CommandHandler = async (cmdName, ...args) => {
	if (args.length === 0) {
		throw new Error("login command requires a username");
	}

	const username = args[0];

	const user = await getUser(username);
	if (!user) {
		throw new Error(`User "${username}" does not exist`);
	}

	setUser(username);
	console.log(`Current user set to ${username}`);
};
