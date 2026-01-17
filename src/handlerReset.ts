import { CommandHandler } from "./commands";
import { deleteAllUsers } from "./lib/db/queries/users";

export const handlerReset: CommandHandler = async () => {
	await deleteAllUsers();
	console.log("Database reset successfully");
};
