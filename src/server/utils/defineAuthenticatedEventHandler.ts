import { CompatibilityEvent } from 'h3';

import { IUserInfo } from '~/types/IUser';
import { log } from '~/server/utils/log';
import getAuth from './getAuth';

export function defineAuthenticatedEventHandler<T>(handler: (event: CompatibilityEvent, user: IUserInfo | null) => T | Promise<T>) {
    return defineEventHandler<T>(async (event) => {
        try {
            const user = await getAuth(event);
            if (user == null) {
                sendError(event, createError({ statusCode: 401, statusMessage: `no user` }));
            }
            return handler(event, user);
        } catch (err) {
            log.error('defineAuthenticatedEventHandler', `no authorization : ${err}`);
            sendError(event, createError({ statusCode: 401, statusMessage: `no authorization : ${err}` }));
        }
    });
}
