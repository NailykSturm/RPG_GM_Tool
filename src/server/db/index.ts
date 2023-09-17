import mongoose from 'mongoose';
import { Nitro } from 'nitropack';
import {log, logLv} from '~/server/utils/log';

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig();

    mongoose.set('strictQuery', false);

    mongoose
        .connect(config.MONGO_URI, {
            dbName: config.MONGO_DB_NAME,
        })
        .then((db) => log(logLv.INFO, 'db/index', `Connected to the database ${db.connection.name}`))
        .catch((e) => log(logLv.ERROR, 'db/index', `Error while connecting to database at ${config.MONGO_URI}: ${e}`));
};
