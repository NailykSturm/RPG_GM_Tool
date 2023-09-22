import { validateBody } from 'h3-typebox';

import { gameInfoUpdateSchema } from '~/server/validations/index';
import userModel from '~/server/models/User';
import { log, logLv } from '~/server/utils/log';
import { IAPIResponse } from '~/types/IAPI';
import { IBestiary, IBestiaryCreature } from '~/types/IGame';

export default defineEventHandler(async (event) => {
    try {
        const { gameName, gameUniverse, old_name, old_universe, user_id } = await validateBody(event, gameInfoUpdateSchema);
        log(logLv.FULL, 'POST API/game/update', `Access to the update game request (game: ${old_name})`, user_id)

        try {
            const user = await userModel.findById(user_id);
            if (!user) throw createError({ statusCode: 402, statusMessage: 'unknown user' });
            log(logLv.DEBUG, 'POST API/game/update', `Get user to update the game ${old_name} | ${old_universe} => ${gameName} | ${gameUniverse}`, user._id);

            let nbGameUpdated = 0;
            user.games.forEach((game, index) => {
                if (game.name == old_name && (game.universe == old_universe || game.universe == gameUniverse)) {
                    game.name = gameName;
                    game.universe = gameUniverse;
                    log(logLv.DEBUG, 'POST API/game/update', `Game ${old_name} updated : name = ${old_name} => ${gameName} | universe = ${old_universe} => ${gameUniverse}`, user._id);
                    nbGameUpdated++;
                }
            });

            if (nbGameUpdated == 0) {
                log(logLv.ERROR, 'POST API/game/update', `Game ${old_name} not found`, user._id);
                return createError({ statusCode: 402, statusMessage: 'game not found' });
            }
            else if (nbGameUpdated == 1) log(logLv.INFO, 'POST API/game/update', `Game ${gameName} updated`, user._id);
            else log(logLv.WARN, 'POST API/game/update', `${nbGameUpdated} games updated | request : oldName=${old_name} oldUniverse=${old_universe} newName=${gameName} newUniverse=${gameUniverse}`, user._id);

            try {
                await userModel.updateOne({ _id: user_id }, { $set: { games: user.games } }).exec();
                log(logLv.DEBUG, 'POST API/game/update', `Game ${gameName} updated in DB`, user._id);
            } catch (error) {
                log(logLv.CRITICAL, 'POST API/game/update', `Cannot access DB to update game : ${error}`);
                return createError({ statusCode: 500, statusMessage: 'Internal server error' });
            }

            let knownOldUniverse = user.bestiaries.find(bestiary => {
                return bestiary.universe == old_universe;
            });
            let knownNewUniverse = user.bestiaries.find(bestiary => {
                return bestiary.universe == gameUniverse;
            });

            if (!knownOldUniverse) {
                if (!knownNewUniverse) {
                    knownNewUniverse = { universe: gameUniverse, creatures: [] } as IBestiary;
                    user.bestiaries.push(knownNewUniverse);
                    log(logLv.DEBUG, 'POST API/game/new', `Bestiary ${gameUniverse} created`, user._id);
                } else {
                    log(logLv.DEBUG, 'POST API/game/new', `Bestiary ${gameUniverse} found, not modified`, user._id)
                }
            } else {
                if (!knownNewUniverse) {
                    knownNewUniverse = { universe: gameUniverse, creatures: knownOldUniverse.creatures } as IBestiary;
                    user.bestiaries.push(knownNewUniverse);
                    log(logLv.DEBUG, 'POST API/game/new', `Bestiary ${gameUniverse} created with bestiary from ${old_universe}`, user._id);
                } else {
                    if (knownOldUniverse.universe != knownNewUniverse.universe) {
                        let merge: IBestiaryCreature[] = [];
                        if (knownOldUniverse.creatures) merge.push(...knownOldUniverse.creatures);
                        if (knownNewUniverse.creatures) merge.push(...knownNewUniverse.creatures);
                        knownNewUniverse.creatures = merge;
                        log(logLv.DEBUG, 'POST API/game/new', `Bestiary ${gameUniverse} merged with bestiary from ${old_universe}`, user._id);
                    }
                }
            }

            try {
                await userModel.updateOne({ _id: user_id }, { $set: { bestiaries: user.bestiaries } }).exec();
                log(logLv.DEBUG, 'POST API/game/new', `Bestiary ${gameUniverse} updated`, user._id);
            } catch (error) {
                log(logLv.CRITICAL, 'POST API/game/new', `Cannot access DB to update bestiary : ${error}`);
                return createError({ statusCode: 500, statusMessage: 'Internal server error' });
            }

            return { statusCode: 200, statusMessage: `Game ${gameName} updated` } as IAPIResponse;

        } catch (error) {
            log(logLv.CRITICAL, 'POST API/game/update', `Cannot access DB to get user : ${error}`);
            return createError({ statusCode: 500, statusMessage: 'Internal server error' });
        }
    } catch (error) {
        log(logLv.INFO, 'POST API/game/update', `Wrong parameters for update game request : ${error.statusMessage}`);
        return error;
    }
});