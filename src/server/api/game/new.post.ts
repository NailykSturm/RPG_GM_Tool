import { createError } from 'h3';
import { validateBody, Type } from 'h3-typebox'
import mongoose from 'mongoose';

import userModal from '~/server/models/User';
import { newGameSchema } from '~/server/validations/index';

export default defineEventHandler(async (event) => {
    try {
        const { newGameName, newGameUniverse, user_id } = await validateBody(event, newGameSchema);

        console.log(`New game request incoming => new game name : ${newGameName} from user n°${user_id}`);

        const user = await userModal.findById(user_id);
        if (!user) throw createError({ statusCode: 402, statusMessage: 'unknown user' })

        user.games.forEach(game => {
            if (game.name == newGameName) throw createError({ statusCode: 401, statusMessage: 'game already exists' })
        });
        userModal.updateOne({ _id: user_id }, { $push: { games: { name: newGameName, universe: newGameUniverse } } }).exec();


        event.res.statusCode = 200;
        event.res.statusMessage = 'OK';
        event.res.write(`[WIP] New game ${newGameName} added`);
        event.res.end();

    } catch (error) {
        // console.log(error)
        let { statusCode, statusMessage } = error;
        if (statusMessage.includes("'user_id")) statusMessage = 'Cannot identify the user'
        else if (statusMessage.includes("'newGameName")) statusMessage = 'New game name is missing'

        throw createError({
            statusCode: statusCode,
            statusMessage: statusMessage
        })
    }
});
