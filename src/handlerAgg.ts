import { CommandHandler } from "./commands";
import { getNextFeedToFetch, markFeedFetched } from "./lib/db/queries/feeds";
import { fetchFeed } from "./lib/rss/fetchFeed";

function parseDuration(durationStr: string): number {
	const regex = /^(\d+)(ms|s|m|h)$/;
	const match = durationStr.match(regex);

	if (!match) {
		throw new Error("Invalid duration format (use ms, s, m, or h)");
	}

	const value = Number(match[1]);
	const unit = match[2];

	switch (unit) {
		case "ms":
			return value;
		case "s":
			return value * 1000;
		case "m":
			return value * 60 * 1000;
		case "h":
			return value * 60 * 60 * 1000;
		default:
			throw new Error("Invalid duration unit");
	}
}

async function scrapeFeeds() {
	const feed = await getNextFeedToFetch();
	if (!feed) return;

	console.log(`Fetching feed: ${feed.url}`);

	await markFeedFetched(feed.id);

	const rss = await fetchFeed(feed.url);

	for (const item of rss.items) {
		console.log(`- ${item.title}`);
	}
}

export const handlerAgg: CommandHandler = async (_, ...args) => {
	const durationStr = args[0];

	if (!durationStr) {
		throw new Error("Usage: agg <time_between_reqs>");
	}

	const timeBetweenRequests = parseDuration(durationStr);

	console.log(`Collecting feeds every ${durationStr}`);

	await scrapeFeeds().catch(console.error);

	const interval = setInterval(() => {
		scrapeFeeds().catch(console.error);
	}, timeBetweenRequests);

	await new Promise<void>((resolve) => {
		process.on("SIGINT", () => {
			console.log("Shutting down feed aggregator...");
			clearInterval(interval);
			resolve();
		});
	});
};
