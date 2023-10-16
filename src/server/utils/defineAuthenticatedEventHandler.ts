import { CompatibilityEvent }  from 'h3';

import { IUserInfo } from '~/types/IUser';
import { log } from '~/server/utils/log';
import getAuth from './getAuth';

export function defineAuthenticatedEventHandler<T>(handler: (event: CompatibilityEvent, user: IUserInfo) => T | Promise<T>) {
    return defineEventHandler<T>(async (event) => {
        try {
            const user = await getAuth(event);
            return handler(event, user);
        } catch (err) {
            log.error('defineAuthenticatedEventHandler', `no authorization : ${err}`);
            sendError(event, createError({ statusCode: 400, statusMessage: `no authorization : ${err}` }));
        }
    });
}
