import { CommandsRegistry, registerCommand, runCommand } from "./commands";
import { handlerAddFeed } from "./handlerAddFeed";
import { handlerAgg } from "./handlerAgg";
import { handlerBrowse } from "./handlerBrowse";
import { handlerFeeds } from "./handlerFeeds";
import { handlerFollow } from "./handlerFollow";
import { handlerFollowing } from "./handlerFollowing";
import { handlerLogin } from "./handlerLogin";
import { handlerRegister } from "./handlerRegister";
import { handlerReset } from "./handlerReset";
import { handlerUnfollow } from "./handlerUnfollow";
import { handlerUsers } from "./handlerUsers";
import { middlewareLoggedIn } from "./middlewareLoggedIn";

async function main() {
	const registry: CommandsRegistry = {};

	registerCommand(registry, "register", handlerRegister);
	registerCommand(registry, "login", handlerLogin);
	registerCommand(registry, "users", handlerUsers);
	registerCommand(registry, "reset", handlerReset);
	registerCommand(registry, "agg", handlerAgg);
	registerCommand(registry, "addfeed", middlewareLoggedIn(handlerAddFeed));
	registerCommand(registry, "feeds", handlerFeeds);
	registerCommand(registry, "follow", middlewareLoggedIn(handlerFollow));
	registerCommand(registry, "unfollow", middlewareLoggedIn(handlerUnfollow));
	registerCommand(registry, "following", middlewareLoggedIn(handlerFollowing));
	registerCommand(registry, "browse", middlewareLoggedIn(handlerBrowse));

	const args = process.argv.slice(2);

	if (args.length < 1) {
		console.error("Error: not enough arguments provided");
		process.exit(1);
	}

	const [cmdName, ...cmdArgs] = args;

	try {
		await runCommand(registry, cmdName, ...cmdArgs);
	} catch (err) {
		if (err instanceof Error) {
			console.error(`Error: ${err.message}`);
		} else {
			console.error("Unknown error");
		}

		process.exit(1);
	}

	process.exit(0);
}

main();
