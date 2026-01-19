import { UserCommandHandler } from "./commands";
import { createFeedFollow } from "./lib/db/queries/feedFollows";
import { createFeed } from "./lib/db/queries/feeds";
import { printFeed } from "./lib/printFeed";

export const handlerAddFeed: UserCommandHandler = async (
	_,
	user,
	...args
) => {
	const [name, url] = args;

	if (!name || !url) {
		throw new Error("Usage: addfeed <name> <url>");
	}

	const feed = await createFeed(name, url, user.id);

	printFeed(feed, user);

	await createFeedFollow(user.id, feed.id);

	console.log(`${user.name} is now following ${feed.name}`);

};
