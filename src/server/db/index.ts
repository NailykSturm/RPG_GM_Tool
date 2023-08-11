import mongoose from 'mongoose';
import { Nitro } from 'nitropack';

export default async (_nitroApp: Nitro) => {
    const config = useRuntimeConfig();

    mongoose.set('strictQuery', false);

    mongoose
        .connect(config.MONGO_URI, {
            dbName: config.MONGO_DB_NAME,
        })
        .then((db) => console.log(`Connected to DB : ${db.connection.db.databaseName}`))
        .catch((e) => console.log(e));
};
