import userModel from '~/server/models/User';
import bestiaryModel from '~/server/models/Bestiary';
import { log } from '~/server/utils/log';
import bestiaryGet from '~/server/api/bestiary/[universe]/index.get';
import meGet from '~/server/api/me.get';
import { IBestiary, IBestiaryField } from '~/types/IGame';
import { IAPIResponse } from '~/types/IAPI';

const caller = 'POST API/bestiary/:universe/addField';
export default defineEventHandler(async (event) => {
    const { universe } = event.context.params;
    log.debug(caller, `Add a field for universe: ${universe}'s bestiary`, 'not known yet');

    try {
        const me = await meGet(event);
        const user = await userModel.findById(me._id);
        if (!user) return createError({ statusCode: 402, statusMessage: 'unknown user' });
        const bestiaries = await bestiaryModel.find({ owner: me._id });

        const bestiary: IBestiary = bestiaries.find((bestiary) => {
            return bestiary.universe == universe;
        });

        if (!bestiary) {
            log.error(caller, `Bestiary ${universe} not found`, me._id);
            return createError({ statusCode: 402, statusMessage: 'bestiary not found' });
        }

        log.debug(caller, `Add a field for universe: ${universe}'s bestiary`, me._id);
        const body = await readBody(event);
        const field: IBestiaryField = body.field;
        log.debug(caller, `new field name : ${field.field}`, me._id);

        const knownField = bestiary.fields.find((f) => {
            return f.field.toLowerCase() == field.field.toLowerCase();
        });
        if (knownField) {
            log.error(caller, `Field already exists`, me._id);
            return createError({ statusCode: 401, statusMessage: 'field already exists' });
        }
        bestiary.fields.push(field);
        log.debug(caller, `Field doesn't exist yet. So we add it : ${bestiary}`, me._id);

        try {
            const dbResult = await bestiaryModel.updateOne(
                { owner: me._id, universe: universe, _id: bestiary._id },
                { $set: { fields: bestiary.fields } }
            );
            log.trace(caller, dbResult, me._id);

            if (dbResult.matchedCount == 1 && dbResult.modifiedCount == 1) {
                log.info(caller, `Field added`, me._id);

                return await bestiaryGet(event);
            } else {
                log.error(caller, `Error while adding field`, me._id);
                log.trace(caller, dbResult, me._id);
                return createError({ statusCode: 500, statusMessage: 'Error while adding field' });
            }
        } catch (error) {
            log.error(caller, `Error while adding field ${error}`, me._id);
            return createError({ statusCode: 500, statusMessage: 'Error while adding field' });
        }
    } catch (error) {
        log.critical(caller, `Error while getting user ID : ${error}`);
        return { statusCode: 500, statusMessage: 'Internal server error' } as IAPIResponse
    }
});