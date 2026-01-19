import { UserCommandHandler } from "./commands";
import { getFeedFollowsForUser } from "./lib/db/queries/feedFollows";

export const handlerFollowing: UserCommandHandler = async (_, user) => {
	const follows = await getFeedFollowsForUser(user.id);

	for (const follow of follows) {
		console.log(`* ${follow.feedName}`);
	}
};
