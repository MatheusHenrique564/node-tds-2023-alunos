import pgPromise from "pg-promise";
import { config } from "dotenv";
import path, { join } from "path";
import { fileURLToPath } from "url";

config();

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;

const dbURL = `postgres://${user}:${password}@${host}:${port}/${database}`;
const pg = pgPromise()(dbURL);

export function connect() {
    pg.query("SELECT 1 + 1 AS result").then((result) => {
        console.log(result[0].result);
    });
    return pg;
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const filePath = join(__dirname, "create-tables.sql");
const query = new pgPromise.QueryFile(filePath);

pg.query(query);

export default pg;

