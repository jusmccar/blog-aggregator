import { createUser, getUser } from "src/lib/db/queries/users";
import { CommandHandler } from "./commands";
import { setUser } from "./config";

export const handlerRegister: CommandHandler = async (_, ...args) => {
	const name = args[0];

	if (!name) {
		throw new Error("Usage: register <name>");
	}

	const existingUser = await getUser(name);

	if (existingUser) {
		throw new Error(`User "${name}" already exists`);
	}

	const user = await createUser(name);

	setUser(name);

	console.log(`User "${name}" created successfully`);
	console.log("Created user:", user);
};
