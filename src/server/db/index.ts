import mongoose from 'mongoose';
import { Nitro } from 'nitropack';
import {log, logLv} from '~/server/utils/log';

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig();
    mongoose.set('strictQuery', false);

    mongoose
        .connect(`mongodb://${config.MONGO_DB_USER}:${config.MONGO_DB_PASS}@${config.MONGO_URL}`, {
            dbName: config.MONGO_DB_NAME || 'RPG_tool_gm',
        })
        .then((db) => {
            log(logLv.INFO, 'db/index', `Connected to the database ${db.connection.name}`)
            db.connection.on('error', (e) => log(logLv.ERROR, 'db/index', `Error during use of the database at ${config.MONGO_URI}: ${e}`));
        })
        .catch((e) => log(logLv.ERROR, 'db/index', `Error while connecting to database at ${config.MONGO_URI}: ${e}`));
};
