import { createError, type H3Error } from "h3";
import { validateBody, Type } from "h3-typebox";
import type { NuxtError } from "nuxt/dist/app/composables";

import userModel from "../../models/User";
import { gameInfoSchema } from "../../validations/index";
import { log } from "../../utils/filelogger";
import type { IAPIResponse } from "../../../types/API/IAPI";
import type { IBestiary } from "../../../types/Game/IGame";
import newBestiary from "../bestiary/[universe]/new.post";

const caller = "POST API/game/new";
export default defineEventHandler(async (event) => {
    try {
        const { gameName, gameUniverse, user_id } = await validateBody(event, gameInfoSchema);
        log.debug(caller, `New game request incoming => new game name : ${gameName}`, user_id);

        try {
            const user = await userModel.findById(user_id);
            if (!user) {
                log.error(caller, `Cannot find user`, user_id);
                return createError({ statusCode: 402, statusMessage: "unknown user" });
            }

            log.debug(caller, "User retreived, try to find bestiary", user_id);
            let bestiary: IBestiary;
            try {
                event.context.params!.universe = gameUniverse.name;
                const createBestiaryResult = await newBestiary(event);
                if (!isError(createBestiaryResult)) bestiary = createBestiaryResult;
                else {
                    log.critical(caller, `Error creating bestiary ${createBestiaryResult}`, user._id);
                    return createError({ statusCode: 500, statusMessage: "Internal server error" });
                }
            } catch (error) {
                log.critical(caller, `Cannot create bestiary : ${error}`);
                return createError({ statusCode: 500, statusMessage: "Internal server error" });
            }

            user.games.forEach((game) => {
                if (game.name.toLowerCase() == gameName.toLowerCase()) {
                    log.info(caller, `game already exists`, user._id);
                    return createError({ statusCode: 401, statusMessage: "game already exists" });
                }
            });

            try {
                await userModel
                    .updateOne(
                        { _id: user_id },
                        { $push: { games: { name: gameName, universe: { name: bestiary.universe, id: bestiary._id } } } }
                    )
                    .exec();
            } catch (error) {
                log.critical(caller, `Cannot access DB to create game : ${error}`);
                return createError({ statusCode: 500, statusMessage: "Internal server error" });
            }

            return { statusCode: 200, statusMessage: `New game ${gameName} added` } as IAPIResponse;
        } catch (error) {
            log.critical(caller, `Cannot access DB to find user : ${error}`);
            return createError({ statusCode: 500, statusMessage: "Internal server error" });
        }
    } catch (error: any) {
        // console.log(error)
        let { statusCode, statusMessage } = error;
        if (statusMessage.includes("'user_id")) statusMessage = "Cannot identify the user";
        else if (statusMessage.includes("'newGameName")) statusMessage = "New game name is missing";

        log.error(caller, `Wrong parameters for update game request : ${error}`);
        return createError({ statusCode: statusCode, statusMessage: statusMessage });
    }
});
