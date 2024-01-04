import bestiaryModel from '~/server/models/Bestiary';
import { log } from '~/server/utils/log';
import meGet from '~/server/api/me.get';
import { IBestiary } from '~/types/IGame';

const caller = 'POST API/bestiary/:universe/new';
export default defineEventHandler(async (event) => {
    try {
        const me = await meGet(event);
        const { universe } = event.context.params;

        log.debug(caller, `New bestiary request incoming => new bestiary name : ${universe}`, me._id);

        let bestiary: IBestiary = await bestiaryModel.findOne({ owner: me._id, universe: universe });
        if (bestiary) {
            log.info(caller, `Bestiary already exists : ${bestiary}`, me._id);
            return bestiary;
        }
        bestiary = await bestiaryModel.create({ owner: me._id, universe: universe });
        if (!bestiary) {
            log.error(caller, `Cannot create bestiary`, me._id);
            return createError({ statusCode: 500, statusMessage: 'Cannot create bestiary' });
        }
        log.info(caller, `New bestiary created => ${bestiary}`, me._id);
        return bestiary;
    } catch (error) {
        log.critical(caller, `Cannot access DB to create bestiary : ${error}`);
        return createError({ statusCode: 500, statusMessage: 'Internal server error' });
    }
});
