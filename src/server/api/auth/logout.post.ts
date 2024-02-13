import type { IAPIResponse } from "../../../types/API/IAPI";
import { log } from "../../utils/filelogger";
import meGet from "../me.get";

const config = useRuntimeConfig();

export default defineEventHandler(async (event) => {
    try {
        const { _id } = await meGet(event);

        deleteCookie(event, "token", {
            httpOnly: true,
            path: "/",
            sameSite: "strict",
            secure: config.ENV === "prod",
        });

        log.debug("POST API/auth/logout", "Logout success", _id);
        return { statusCode: 200, statusMessage: "Logout success" } as IAPIResponse;
    } catch (error) {
        log.critical("POST API/auth/logout", `Error access DB while getting user ID : ${error}`);
        return error;
    }
});
