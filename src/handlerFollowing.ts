import { CommandHandler } from "./commands";
import { readConfig } from "./config";
import { getFeedFollowsForUser } from "./lib/db/queries/feedFollows";
import { getUser } from "./lib/db/queries/users";

export const handlerFollowing: CommandHandler = async () => {
	const config = readConfig();

	if (!config.currentUserName) {
		throw new Error("No user logged in");
	}

	const user = await getUser(config.currentUserName);

	if (!user) throw new Error("User not found");

	const follows = await getFeedFollowsForUser(user.id);

	for (const follow of follows) {
		console.log(`* ${follow.feedName}`);
	}
};
