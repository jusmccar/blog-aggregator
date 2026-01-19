import { CommandHandler } from "./commands";
import { readConfig } from "./config";
import { createFeedFollow } from "./lib/db/queries/feedFollows";
import { createFeed } from "./lib/db/queries/feeds";
import { getUser } from "./lib/db/queries/users";
import { printFeed } from "./lib/printFeed";

export const handlerAddFeed: CommandHandler = async (
	cmdName,
	...args
) => {
	const [name, url] = args;

	if (!name || !url) {
		throw new Error("Usage: addfeed <name> <url>");
	}

	const config = readConfig();

	if (!config.currentUserName) {
		throw new Error("No user logged in");
	}

	const user = await getUser(config.currentUserName);

	if (!user) {
		throw new Error("Current user not found");
	}

	const feed = await createFeed(name, url, user.id);

	printFeed(feed, user);

	await createFeedFollow(user.id, feed.id);

	console.log(`${user.name} is now following ${feed.name}`);

};
