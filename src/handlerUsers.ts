import { CommandHandler } from "./commands";
import { readConfig } from "./config";
import { getUsers } from "./lib/db/queries/users";

export const handlerUsers: CommandHandler = async () => {
	const users = await getUsers();
	const config = readConfig();
	const currentUser = config.currentUserName;

	for (const user of users) {
		if (user.name === currentUser) {
			console.log(`* ${user.name} (current)`);
		} else {
			console.log(`* ${user.name}`);
		}
	}
};
