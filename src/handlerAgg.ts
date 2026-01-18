import { CommandHandler } from "./commands";
import { fetchFeed } from "./lib/rss/fetchFeed";

export const handlerAgg: CommandHandler = async () => {
	const feed = await fetchFeed("https://www.wagslane.dev/index.xml");
	console.log(feed);
};
