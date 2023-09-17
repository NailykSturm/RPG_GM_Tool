import { validateBody } from 'h3-typebox';

import { gameInfoSchema } from '~/server/validations/index';
import userModel from '~/server/models/User';
import { log, logLv } from '~/server/utils/log';
import { IAPIResponse } from '~/types/IAPI';

export default defineEventHandler(async (event) => {
    const { gameName, gameUniverse, user_id } = await validateBody(event, gameInfoSchema);

    try {
        const user = await userModel.findById(user_id);
        if (!user) throw createError({ statusCode: 402, statusMessage: 'unknown user' });

        let nbGameDeleted = 0;
        user.games.forEach((game, index) => {
            if (game.name == gameName && game.universe == gameUniverse) {
                user.games.splice(index, 1);
                nbGameDeleted++;
            }
        });

        try {

            await userModel.updateOne({ _id: user_id }, { $set: { games: user.games } }).exec();
            if (nbGameDeleted == 0) {
                log(logLv.ERROR, 'POST API/game/delete', `Cannot delete game ${gameName} : game not found`, user._id);
                return createError({ statusCode: 402, statusMessage: 'game not found' })
            }
            else if (nbGameDeleted == 1) log(logLv.INFO, 'POST API/game/delete', `Game ${gameName} deleted`, user._id);
            else log(logLv.WARN, 'POST API/game/delete', `${nbGameDeleted} games ${gameName} deleted`, user._id);

            return { statusCode: 200, statusMessage: 'Delete game successfully', message: `Game ${gameName} deleted` } as IAPIResponse;

        } catch (error) {
            log(logLv.ERROR, 'POST API/game/delete', `Cannot delete game ${gameName} : ${error}`, user._id);
            return createError({ statusCode: 500, statusMessage: 'Cannot delete game' });
        }
    } catch (error) {
        log(logLv.CRITICAL, 'POST API/game/delete', `Cannot connect to DB to find user : ${error}`, user_id);
        return createError({ statusCode: 500, statusMessage: 'Cannot delete game' });
    }
});
