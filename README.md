# Blog Aggregator CLI

A command-line RSS feed aggregator built with TypeScript, Node.js, PostgreSQL, and Drizzle ORM.

This tool lets you:
- Register and log in users
- Add and follow RSS feeds
- Continuously fetch and store posts from feeds
- Browse posts from feeds you follow directly in the terminal

## Requirements

You’ll need the following installed:

- Node.js
- npm
- PostgreSQL
- Git

## Installation

Clone the repository and install dependencies:

```
git clone <your-repo-url>
cd blog-aggregator
npm install
```

## Database Setup

1. Make sure PostgreSQL is running.
2. Create a database (example name: `gator`):

`createdb gator`

3. Run database migrations:

`npx drizzle-kit migrate`

## Configuration

The CLI uses a config file located at:

`~/.gatorconfig.json`

Create this file manually with the following contents:

```
{
  "db_url": "postgres://postgres:postgres@localhost:5432/gator?sslmode=disable",
  "current_user_name": "justin"
}
```

- Update `db_url` and `current_user_name` if your database credentials differ.

## Running the CLI

All commands are run using:

`npm run start <command> [...args]`

## Common Commands

### Register a user
Creates a new user and logs them in.

`npm run start register justin`

---

### Log in
Switches the current user.

`npm run start login justin`

---

### Add a feed
Adds a new RSS feed and automatically follows it.

`npm run start addfeed "Boot.dev Blog" https://blog.boot.dev/index.xml`

---

### Follow a feed
Follow an existing feed by URL.

`npm run start follow https://blog.boot.dev/index.xml`

---

### Unfollow a feed
Stop following a feed.

`npm run start unfollow https://blog.boot.dev/index.xml`

---

### List feeds
Shows all feeds and who added them.

`npm run start feeds`

---

### List followed feeds
Shows feeds the current user is following.

`npm run start following`

---

### Run the aggregator
Continuously fetches posts from feeds in the background.

`npm run start agg 1m`

Press `Ctrl+C` to stop the aggregator.

---

### Browse posts
View recent posts from feeds you follow.

`npm run start browse 5`

---

### Reset the database (development only)
Deletes all users, feeds, follows, and posts.

`npm run start reset`

Warning: this is destructive and should not be used in production.

## Notes

- The aggregator is rate-limited to avoid overwhelming RSS providers.
- Duplicate posts are ignored automatically.
- Feeds are fetched in a rotating order based on when they were last fetched.
