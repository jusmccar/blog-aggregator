import { XMLParser } from "fast-xml-parser";
import { RSSFeed, RSSItem } from "./types";

export async function fetchFeed(feedURL: string): Promise<RSSFeed> {
	const response = await fetch(feedURL, {
		headers: {
			"User-Agent": "gator",
		},
	});

	if (!response.ok) {
		throw new Error(`Failed to fetch feed: ${response.status}`);
	}

	const xml = await response.text();

	const parser = new XMLParser();
	const parsed = parser.parse(xml);

	const channel = parsed?.rss?.channel;
	if (!channel) {
		throw new Error("Invalid RSS feed: missing channel");
	}

	const { title, link, description } = channel;

	if (
		typeof title !== "string" ||
		typeof link !== "string" ||
		typeof description !== "string"
	) {
		throw new Error("Invalid RSS feed: missing channel metadata");
	}

	let rawItems: any[] = [];

	if (Array.isArray(channel.item)) {
		rawItems = channel.item;
	} else if (typeof channel.item === "object") {
		rawItems = [channel.item];
	}

	const items: RSSItem[] = [];

	for (const item of rawItems) {
		const { title, link, description, pubDate } = item;

		if (
			typeof title !== "string" ||
			typeof link !== "string" ||
			typeof description !== "string" ||
			typeof pubDate !== "string"
		) {
			continue;
		}

		items.push({
			title,
			link,
			description,
			pubDate,
		});
	}

	return {
		title,
		link,
		description,
		items,
	};
}
