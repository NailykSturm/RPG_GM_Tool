import { H3Error, H3Event } from 'h3';
import { IGame } from '~~/src/types/IGame';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    let listGames = []
    for (let i = 0; i < 20; i++) {
        const element: IGame = {
            _id: i,
            name: `RPG_${i + 1}`
        };
        listGames.push(element);
    }
    return listGames;
});