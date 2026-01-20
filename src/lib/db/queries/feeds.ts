import { eq, sql } from "drizzle-orm";
import { db } from "..";
import { feeds, users } from "../schema";

export async function createFeed(
	name: string,
	url: string,
	userId: string
) {
	const [feed] = await db
		.insert(feeds)
		.values({
			name,
			url,
			userId,
		})
		.returning();

	return feed;
}

export async function getFeedsWithUsers() {
	return await db
		.select({
			feed: feeds,
			user: users,
		})
		.from(feeds)
		.innerJoin(users, eq(feeds.userId, users.id));
}

export async function getFeedByURL(url: string) {
	const [feed] = await db
		.select()
		.from(feeds)
		.where(eq(feeds.url, url));

	return feed;
}

export async function markFeedFetched(feedId: string) {
	await db
		.update(feeds)
		.set({
			lastFetchedAt: new Date(),
			updatedAt: new Date(),
		})
		.where(eq(feeds.id, feedId));
}

export async function getNextFeedToFetch() {
	const [feed] = await db
		.select()
		.from(feeds)
		.orderBy(sql`${feeds.lastFetchedAt} NULLS FIRST`)
		.limit(1);

	return feed;
}
