import { readConfig, setUser } from "./config";

function main() {
	setUser("Justin");
	const config = readConfig();
	console.log(config);
}

main();
