import { CommandHandler, UserCommandHandler } from "./commands";
import { readConfig } from "./config";
import { getUser } from "./lib/db/queries/users";

export function middlewareLoggedIn(
	handler: UserCommandHandler
): CommandHandler {
	return async (cmdName: string, ...args: string[]) => {
		const config = readConfig();

		if (!config.currentUserName) {
			throw new Error("No user logged in");
		}

		const user = await getUser(config.currentUserName);

		if (!user) {
			throw new Error("User not found");
		}

		return handler(cmdName, user, ...args);
	};
}
