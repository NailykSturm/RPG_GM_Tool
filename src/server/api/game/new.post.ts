import { createError } from 'h3';

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    if (!body) {
        throw createError({
            statusCode: 400, 
            message: 'Request body is missing'
        });
    }
    const { newGameName, user_id } = body;
    console.log(`New game request incoming => new game name : ${newGameName} from user n°${user_id}`);
    
    if (!newGameName) {
        throw createError({
            statusCode: 400,
            message: 'New game name is missing'
        });
    }
    if (!user_id) {
        throw createError({
            statusCode: 400,
            message: 'Cannot identify the user'
        });
    }

    event.res.statusCode = 200;
    event.res.statusMessage = 'OK';
    event.res.write(`[WIP] New game ${newGameName} added`);
    event.res.end();
});
