import mongoose from "mongoose";
import type { Nitro } from "nitropack";
import { log } from "../utils/filelogger";

export default async (_nitroApp: Nitro) => {
    await connectDatabase();
};

export function connectDatabase(): Promise<typeof mongoose> {
    const config = useRuntimeConfig();
    mongoose.set("strictQuery", false);

    return new Promise((resolve, reject) => {
        mongoose
            .connect(`mongodb://${config.MONGO_DB_USER}:${config.MONGO_DB_PASS}@${config.MONGO_URL}`, {
                dbName: config.MONGO_DB_NAME || "RPG_tool_gm",
            })
            .then((db) => {
                log.info("db/index", `Connected to the database ${db.connection.name}`);
                db.connection.on("error", (e) =>
                    log.fatal("db/index", `Error during use of the database at ${config.MONGO_URI}: ${e}`)
                );
                resolve(db);
            })
            .catch((e) => {
                log.critical("db/index", `Error while connecting to database at ${config.MONGO_URI}: ${e}`);
                reject(e);
            });
    });
}
