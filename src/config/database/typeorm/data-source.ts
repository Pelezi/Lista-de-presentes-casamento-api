import { DataSource } from "typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    ssl: process.env.DB_SSL === 'true',
    synchronize: true,
    logging: false,
    namingStrategy: new SnakeNamingStrategy(),
    entities: ["src/modules/**/entities/*.entity.ts"],
});

export default dataSource;
