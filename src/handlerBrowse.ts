import { UserCommandHandler } from "./commands";
import { getPostsForUser } from "./lib/db/queries/posts";

export const handlerBrowse: UserCommandHandler = async (
	_,
	user,
	...args
) => {
	const limit = args[0] ? Number(args[0]) : 2;

	if (isNaN(limit) || limit <= 0) {
		throw new Error("Limit must be a positive number");
	}

	const posts = await getPostsForUser(user.id, limit);

	for (const { post, feed } of posts) {
		console.log(`- ${post.title}`);
		console.log(`  ${feed.name}`);
		console.log(`  ${post.url}`);
		console.log();
	}
};
