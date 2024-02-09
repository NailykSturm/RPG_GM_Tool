import { H3Event } from "h3";

import type { IUserInfo } from "../../types/User/IUser";
import { log } from "./filelogger";
import getAuth from "./getAuth";

export function defineAuthenticatedEventHandler<T>(handler: (event: H3Event, user: IUserInfo | null) => T | Promise<T>) {
    return defineEventHandler<T>(async (event) => {
        try {
            const user = await getAuth(event);
            if (user == null) {
                sendError(event, createError({ statusCode: 401, statusMessage: `no user` }));
            }
            return handler(event, user);
        } catch (err) {
            log.critical("defineAuthenticatedEventHandler", `${err}`);
            sendError(event, createError({ statusCode: 500, statusMessage: `Internal server error` }));
        }
    });
}
