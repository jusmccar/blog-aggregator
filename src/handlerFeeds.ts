import { CommandHandler } from "./commands";
import { getFeedsWithUsers } from "./lib/db/queries/feeds";

export const handlerFeeds: CommandHandler = async () => {
	const results = await getFeedsWithUsers();

	for (const { feed, user } of results) {
		console.log(`Feed: ${feed.name}`);
		console.log(`URL: ${feed.url}`);
		console.log(`Added by: ${user.name}`);
		console.log("");
	}
};
