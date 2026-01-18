import { feeds, users } from "./db/schema";

export type Feed = typeof feeds.$inferSelect;
export type User = typeof users.$inferSelect;

export function printFeed(feed: Feed, user: User) {
	console.log(`Feed: ${feed.name}`);
	console.log(`URL: ${feed.url}`);
	console.log(`Added by: ${user.name}`);
	console.log(`Created at: ${feed.createdAt}`);
}
