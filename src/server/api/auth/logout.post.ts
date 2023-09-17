import { IAPIResponse } from "~/types/IAPI";
import { log, logLv } from "~/server/utils/log";
import meGet from "../me.get";

export default defineEventHandler(async (event) => {

    try {
        const { _id } = await meGet(event);
        
        deleteCookie(event, 'token', {
            httpOnly: true,
            path: '/',
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
        });
        
        log(logLv.DEBUG, 'POST API/auth/logout', 'Logout success', _id);
        return { statusCode: 200, statusMessage: 'Logout success' } as IAPIResponse;
    } catch (error) {
        log(logLv.CRITICAL, 'POST API/auth/logout', `Error access DB while getting user ID : ${error}`);
        return error;
    }
});
