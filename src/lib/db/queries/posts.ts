import { desc, eq } from "drizzle-orm";
import { db } from "..";
import { feedFollows, feeds, posts } from "../schema";

export async function createPost(data: {
	title: string;
	url: string;
	description?: string | null;
	publishedAt?: Date | null;
	feedId: string;
}) {
	const [post] = await db
		.insert(posts)
		.values(data)
		.onConflictDoNothing({ target: posts.url })
		.returning();

	return post;
}

export async function getPostsForUser(
	userId: string,
	limit: number
) {
	return await db
		.select({
			post: posts,
			feed: feeds,
		})
		.from(posts)
		.innerJoin(feeds, eq(posts.feedId, feeds.id))
		.innerJoin(feedFollows, eq(feedFollows.feedId, feeds.id))
		.where(eq(feedFollows.userId, userId))
		.orderBy(desc(posts.publishedAt))
		.limit(limit);
}
