import { CommandHandler } from "./commands";
import { readConfig } from "./config";
import { createFeedFollow } from "./lib/db/queries/feedFollows";
import { getFeedByURL } from "./lib/db/queries/feeds";
import { getUser } from "./lib/db/queries/users";

export const handlerFollow: CommandHandler = async (_, ...args) => {
	const url = args[0];
	if (!url) {
		throw new Error("Usage: follow <url>");
	}

	const config = readConfig();
	if (!config.currentUserName) {
		throw new Error("No user logged in");
	}

	const user = await getUser(config.currentUserName);
	if (!user) throw new Error("User not found");

	const feed = await getFeedByURL(url);
	if (!feed) throw new Error("Feed not found");

	const follow = await createFeedFollow(user.id, feed.id);

	console.log(
		`${follow.userName} is now following ${follow.feedName}`
	);
};
