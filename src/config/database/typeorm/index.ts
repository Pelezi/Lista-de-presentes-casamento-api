import dataSource from "./data-source";

async function main() {
    await dataSource.initialize();
    console.log("Database connected!");
}

main();
