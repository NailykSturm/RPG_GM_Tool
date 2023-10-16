import userModel from '~/server/models/User';
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

        const bestiaries = user.bestiaries;
        const bestiary: IBestiary = bestiaries.find((bestiary) => {
            return bestiary.universe == universe;
        });

        if (!bestiary) {
            log.error(caller, `Bestiary ${universe} not found`, me._id);
            return createError({ statusCode: 402, statusMessage: 'bestiary not found' });
        } else {
            log.low(caller, `Bestiary : ${bestiary}`, me._id);
        }
        if (bestiary.fields == undefined) {
            bestiary.fields = [];
            log.debug(caller, `Bestiary ${universe} has no fields yet`, me._id);
        }

        log.debug(caller, `Add a field for universe: ${universe}'s bestiary`, me._id);
        const body = await readBody(event);
        const field: IBestiaryField = body.field;
        log.debug(caller, `new field name : ${field.field}`, me._id);

        bestiary.fields.find((f) => {
            if (f.field == field.field) {
                log.low(caller, `Field already exists`, me._id);
                return createError({ statusCode: 402, statusMessage: 'field already exists' });
            }
        });
        bestiary.fields.push(field);
        log.debug(caller, `Field doesn't exist yet. So we add it : ${bestiary}`, me._id);

        try {

            const dbResult = await userModel.updateOne(
                { _id: me._id, 'bestiaries.universe': universe },
                { $push: { 'bestiaries': { universe: 'Dummy' } } },
                // { $push: { 'bestiaries.$.fields': field } },
                // {
                //     $set: { 'bestiaries.$[].fields': [] },
                //     $push: { 'bestiaries.$[].fields': field }
                // },
                // { arrayFilters: [{ 'bestiaries.universe' : universe }], upsert: true },
            ).exec();
            log.trace(caller, dbResult, me._id);

            if (dbResult.matchedCount == 1 && dbResult.modifiedCount == 1) {
                log.info(caller, `Field added`, me._id);

                const bestiaries2 = (await userModel.findById(me._id)).bestiaries;
                const bestiary2 = bestiaries2.find((bestiary) => {
                    return bestiary.universe == universe;
                });
                log.trace(caller, bestiary2, me._id);
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