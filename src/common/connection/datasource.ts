import { config } from "dotenv";
import { join } from "path";
import { DataSource, DataSourceOptions } from "typeorm";

config();

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } = process.env;

export const dataSourceOptions: DataSourceOptions = {
  type: "postgres",
  host: DB_HOST,
  port: +DB_PORT,
  database: DB_NAME,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  entities: [join(__dirname, "../**/entities/*.entity{.js,.ts}")],
  migrations: [join(__dirname, "../**/migration/*{.js,.ts}")],
  migrationsRun: true,
  synchronize: true,
  logging: true,
  extra: {
    ssl: {
      rejectUnauthorized: false
    }
  }
};

export const connectDb = new DataSource(dataSourceOptions);
connectDb
  .initialize()
  .then(() => console.log("Data-source initialized!"))
  .catch(error => console.error(error));
