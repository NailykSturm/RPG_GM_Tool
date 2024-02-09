import userModel from "../../../models/User";
import bestiaryModel from "../../../models/Bestiary";
import { log } from "../../../utils/filelogger";
import meGet from "../../me.get";
import type { IBestiary } from "../../../../types/Game/IGame";

export default defineEventHandler(async (event) => {
    const { universe } = event.context.params;
    log.debug("GET API/bestiary/:universe", `Getting bestiary for universe ${universe}`, "not known yet");

    try {
        const me = await meGet(event);
        log.debug("GET API/bestiary/:universe", `Getting bestiary for universe ${universe}`, me._id);

        try {
            const user = await userModel.findById(me._id);
            const bestiaries = await bestiaryModel.find({ owner: me._id });
            let bestiary: IBestiary | undefined;
            bestiaries.forEach((b) => {
                if (b.universe == universe) {
                    bestiary = b;
                    return;
                }
            });

            if (!bestiary) {
                log.error("GET API/bestiary/:universe", `Universe not found`, me._id);
                return createError({ statusCode: 402, statusMessage: "unknown universe" });
            }
            log.info("GET API/bestiary/:universe", `Bestiary found`, me._id);
            return bestiary;
        } catch (error) {
            log.error("GET API/bestiary/:universe", `Error while getting the game list : ${error}`, me._id);
            return createError({ statusCode: 500, statusMessage: "Internal server error" });
        }
    } catch (error) {
        log.critical("GET API/bestiary/:universe", `Error while getting user ID : ${error}`);
        return error;
    }
});
