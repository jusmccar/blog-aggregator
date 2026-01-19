import { UserCommandHandler } from "./commands";
import { createFeedFollow } from "./lib/db/queries/feedFollows";
import { getFeedByURL } from "./lib/db/queries/feeds";

export const handlerFollow: UserCommandHandler = async (_, user, ...args) => {
	const url = args[0];

	if (!url) {
		throw new Error("Usage: follow <url>");
	}

	const feed = await getFeedByURL(url);

	if (!feed) throw new Error("Feed not found");

	const follow = await createFeedFollow(user.id, feed.id);

	console.log(
		`${follow.userName} is now following ${follow.feedName}`
	);
};
