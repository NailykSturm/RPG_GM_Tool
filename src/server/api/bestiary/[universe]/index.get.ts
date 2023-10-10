import userModel from '~/server/models/User';
import { log, logLv } from '~/server/utils/log';
import meGet from '~/server/api/me.get';
import { IBestiary } from '~/types/IGame';


export default defineEventHandler(async (event) => {
    const { universe } = event.context.params;
    log(logLv.INFO, 'GET API/bestiary/:universe', `Getting bestiary for universe ${universe}`, 'not known yet');

    try {
        const me = await meGet(event);
        log(logLv.INFO, 'GET API/bestiary/:universe', `Getting bestiary for universe ${universe}`, me._id);

        if (!me) return createError({ statusCode: 402, statusMessage: 'unknown user' });

        try {
            const user = await userModel.findById(me._id);

            let bestiary: IBestiary;
            user.bestiaries.forEach((b) => {
                if (b.universe == universe) {
                    bestiary = b;
                    return;
                }
            });

            if (!bestiary) return createError({ statusCode: 402, statusMessage: 'unknown universe' });
            return bestiary;

        } catch (error) {
            log(logLv.ERROR, 'GET API/game/list', `Error while getting the game list : ${error}`, me._id);
            return createError({ statusCode: 500, statusMessage: 'Internal server error' });
        }

        return

    } catch (error) {
        log(logLv.CRITICAL, 'GET API/game/list', `Error while getting user ID : ${error}`);
        return error;
    }
});