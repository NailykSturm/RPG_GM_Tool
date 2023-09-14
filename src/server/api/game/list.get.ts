import userModel from '~/server/models/User';
import { IGameInfo, emptyGame } from '~/types/IGame';
import meGet from '~/server/api/me.get';

export default defineEventHandler(async (event) => {

    const { _id } = await meGet(event);

    const user = await userModel.findById(_id);
    if (!user) throw createError({ statusCode: 402, statusMessage: 'unknown user' });

    return user.games;


    // const body = await readBody(event);
    // let listGames = []
    // for (let i = 0; i < 20; i++) {
    //     const element: IGameInfo = {
    //         name: `RPG_${i + 1}`,
    //         universe: `DEBUG`,
    //     };
    //     listGames.push(element);
    // }
    // return listGames;
});