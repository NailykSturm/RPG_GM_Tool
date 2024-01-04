import userModel from '~/server/models/User';
import bestiaryModel from '~/server/models/Bestiary';
import meGet from '~/server/api/me.get';
import { log } from '~/server/utils/log';
import { IGameInfo, IListGamesBestiaries } from '~/types/IGame';
import { IUIBestiaryInfo } from '~/types/IUI';

export default defineEventHandler(async (event) => {
    try {
        const { _id } = await meGet(event);

        try {
            const user = await userModel.findById(_id);
            if (!user) return createError({ statusCode: 402, statusMessage: 'unknown user' });
            const bestiaries = await bestiaryModel.find({ owner: _id });

            let listGames: IGameInfo[] = [];
            let listBestiaries: IUIBestiaryInfo[] = [];

            if (user.games) {
                user.games.forEach((game) => {
                    listGames.push({
                        display: true,
                        name: game.name,
                        universe: game.universe,
                        old_name: game.name,
                        old_universe: game.universe.name,
                    });
                });
                listGames.sort((a, b) => {
                    return a.name.toLowerCase().localeCompare(b.name.toLowerCase());
                });
            }
            if (bestiaries) {
                bestiaries.forEach((bestiary) => {
                    listBestiaries.push({ universe: bestiary.universe, display: true });
                });
                listBestiaries.sort((a, b) => {
                    return a.universe.toLowerCase().localeCompare(b.universe.toLowerCase());
                });
            }

            listGames.forEach((game) => {
                if (!listBestiaries.find((bestiary) => bestiary.universe == game.universe.name)) {
                    log.warn('GET API/game/list', `Bestiary not found for game ${game.name} | ${game.universe} => create new one`, _id);
                    listBestiaries.push({ universe: game.universe.name, display: true });
                }
            });

            return { games: listGames, bestiaries: listBestiaries } as IListGamesBestiaries;
        } catch (error) {
            log.error('GET API/game/list', `Error while getting the game list : ${error}`, _id);
            return createError({ statusCode: 500, statusMessage: 'Internal server error' });
        }
    } catch (error) {
        log.critical('GET API/game/list', `Error while getting user ID : ${error}`);
        return error;
    }
});
