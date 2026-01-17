import { eq } from "drizzle-orm";
import { db } from "..";
import { users } from "../schema";

export async function createUser(name: string) {
	const [result] = await db.insert(users).values({ name: name }).returning();
	return result;
}

export async function getUser(name: string) {
	console.log("getUser");

	const [user] = await db.select().from(users).where(eq(users.name, name)).limit(1);
	return user;
}

export async function deleteAllUsers() {
	await db.delete(users);
}
