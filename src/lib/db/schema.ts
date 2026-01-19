import { sql } from "drizzle-orm";
import { pgTable, text, timestamp, unique, uuid } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
	id: uuid("id").primaryKey().defaultRandom().notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
	updatedAt: timestamp("updated_at")
		.notNull()
		.defaultNow()
		.$onUpdate(() => new Date()),
	name: text("name").notNull().unique(),
});

export const feeds = pgTable("feeds", {
	id: uuid("id").defaultRandom().primaryKey(),

	createdAt: timestamp("created_at")
		.notNull()
		.default(sql`now()`),

	updatedAt: timestamp("updated_at")
		.notNull()
		.default(sql`now()`),

	name: text("name").notNull(),

	url: text("url").notNull().unique(),

	userId: uuid("user_id")
		.notNull()
		.references(() => users.id, {
			onDelete: "cascade",
		}),
});

export const feedFollows = pgTable(
	"feed_follows",
	{
		id: uuid("id").defaultRandom().primaryKey(),

		createdAt: timestamp("created_at")
			.notNull()
			.default(sql`now()`),

		updatedAt: timestamp("updated_at")
			.notNull()
			.default(sql`now()`),

		userId: uuid("user_id")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),

		feedId: uuid("feed_id")
			.notNull()
			.references(() => feeds.id, { onDelete: "cascade" }),
	},
	(table) => ({
		userFeedUnique: unique().on(table.userId, table.feedId),
	})
);
