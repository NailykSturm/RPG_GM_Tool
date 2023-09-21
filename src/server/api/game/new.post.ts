import { createError } from 'h3';
import { validateBody, Type } from 'h3-typebox'
import mongoose from 'mongoose';

import userModel from '~/server/models/User';
import { gameInfoSchema } from '~/server/validations/index';
import { log, logLv } from '~/server/utils/log';
import { IAPIResponse } from '~/types/IAPI';
import { IBestiary } from '~/types/IGame';

export default defineEventHandler(async (event) => {
    try {
        const { gameName, gameUniverse, user_id } = await validateBody(event, gameInfoSchema);
        log(logLv.FULL, 'POST API/game/new', `New game request incoming => new game name : ${gameName}`, user_id);

        try {
            const user = await userModel.findById(user_id);
            if (!user) {
                log(logLv.ERROR, 'POST API/game/new', `Cannot find user`, user_id);
                return createError({ statusCode: 402, statusMessage: 'unknown user' })
            }
            log(logLv.DEBUG, 'POST API/game/new', `User retreived => add a new game : ${gameName}`, user._id);

            user.games.forEach(game => {
                if (game.name == gameName) throw createError({ statusCode: 401, statusMessage: 'game already exists' })
            });

            try {
                await userModel.updateOne({ _id: user_id }, { $push: { games: { name: gameName, universe: gameUniverse } } }).exec();
            } catch (error) {
                log(logLv.CRITICAL, 'POST API/game/new', `Cannot access DB to create game : ${error}`);
                return createError({ statusCode: 500, statusMessage: 'Internal server error' });
            }

            let knownUniverse = user.bestiaries.find(bestiary => {
                return bestiary.universe == gameUniverse;
            });

            if (!knownUniverse) {
                knownUniverse = { universe: gameUniverse, creatures: [] } as IBestiary;
                user.bestiaries.push(knownUniverse);
                try {
                    await userModel.updateOne({ _id: user_id }, { $set: { bestiaries: user.bestiaries } }).exec();
                } catch (error) {
                    log(logLv.CRITICAL, 'POST API/game/new', `Cannot access DB to create bestiary : ${error}`);
                    return createError({ statusCode: 500, statusMessage: 'Internal server error' });
                }
            }
            return { statusCode: 200, statusMessage: `New game ${gameName} added` } as IAPIResponse;

        } catch (error) {
            log(logLv.CRITICAL, 'POST API/game/new', `Cannot access DB to find user : ${error}`);
            return createError({ statusCode: 500, statusMessage: 'Internal server error' });
        }
    } catch (error) {
        // console.log(error)
        log(logLv.INFO, 'POST API/game/new', `Wrong parameters for update game request : ${error.statusMessage}`);
        let { statusCode, statusMessage } = error;
        if (statusMessage.includes("'user_id")) statusMessage = 'Cannot identify the user';
        else if (statusMessage.includes("'newGameName")) statusMessage = 'New game name is missing';

        return createError({ statusCode: statusCode, statusMessage: statusMessage });
    }
});
