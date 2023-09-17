import userModel from '~/server/models/User';
import meGet from '~/server/api/me.get';
import { log, logLv } from '~/server/utils/log';

export default defineEventHandler(async (event) => {

    try {
        const { _id } = await meGet(event);

        try {
            const user = await userModel.findById(_id);
            if (!user) return createError({ statusCode: 402, statusMessage: 'unknown user' });

            return user.games;

        } catch (error) {
            log(logLv.ERROR, 'GET API/game/list', `Error while getting the game list : ${error}`, _id);
            return createError({ statusCode: 500, statusMessage: 'Internal server error' });
        }
    } catch (error) {
        log(logLv.CRITICAL, 'GET API/game/list', `Error while getting user ID : ${error}`);
        return error;
    }
});