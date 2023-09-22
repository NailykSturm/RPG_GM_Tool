import userModel from '~/server/models/User';
import meGet from '~/server/api/me.get';
import { log, logLv } from '~/server/utils/log';
import { IBestiaryInfo, IGameInfo, IListGamesBestiaries } from '~/types/IGame';

export default defineEventHandler(async (event) => {

    try {
        const { _id } = await meGet(event);

        try {
            const user = await userModel.findById(_id);
            if (!user) return createError({ statusCode: 402, statusMessage: 'unknown user' });

            let listGames: IGameInfo[] = [];
            let listBestiaries: IBestiaryInfo[] = [];

            user.games.forEach((game) => {
                listGames.push({ display: true, name: game.name, universe: game.universe, old_name: game.name, old_universe: game.universe });
            });
            user.bestiaries.forEach((bestiary) => {
                listBestiaries.push({ universe: bestiary.universe, display: true });
            });

            listGames.sort((a, b) => {
                return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
            });
            listBestiaries.sort((a, b) => {
                return a.universe.toLowerCase().localeCompare(b.universe.toLowerCase());
            });

            listGames.forEach((game) => {
                if (!listBestiaries.find(bestiary => bestiary.universe == game.universe)) {
                    log(logLv.WARN, 'GET API/game/list', `Bestiary not found for game ${game.name} | ${game.universe}`, _id);
                    listBestiaries.push({ universe: game.universe, display: true });
                }
            });

            return {games: listGames, bestiaries: listBestiaries} as IListGamesBestiaries;

        } catch (error) {
            log(logLv.ERROR, 'GET API/game/list', `Error while getting the game list : ${error}`, _id);
            return createError({ statusCode: 500, statusMessage: 'Internal server error' });
        }
    } catch (error) {
        log(logLv.CRITICAL, 'GET API/game/list', `Error while getting user ID : ${error}`);
        return error;
    }
});