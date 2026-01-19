import { UserCommandHandler } from "./commands";
import { deleteFeedFollowByUserAndFeedURL } from "./lib/db/queries/feedFollows";
import { getFeedByURL } from "./lib/db/queries/feeds";

export const handlerUnfollow: UserCommandHandler = async (
	_,
	user,
	...args
) => {
	const url = args[0];

	if (!url) {
		throw new Error("Usage: unfollow <url>");
	}

	const feed = await getFeedByURL(url);

	if (!feed) {
		throw new Error("Feed not found");
	}

	const deleted = await deleteFeedFollowByUserAndFeedURL(user.id, url);

	if (!deleted) {
		throw new Error("You are not following this feed");
	}

	console.log(`${user.name} unfollowed ${feed.name}`);
};
