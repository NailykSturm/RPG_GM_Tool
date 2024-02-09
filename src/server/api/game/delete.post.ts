import { validateBody } from "h3-typebox";

import { gameInfoSchema } from "../../validations/index";
import userModel from "../../models/User";
import { log } from "../../utils/filelogger";
import type { IAPIResponse } from "../../../types/API/IAPI";

export default defineEventHandler(async (event) => {
    const { gameName, gameUniverse, user_id } = await validateBody(event, gameInfoSchema);

    try {
        const user = await userModel.findById(user_id);
        if (!user) {
            log.critical("POST API/game/delete", `Cannot find user ${user_id}`);
            throw createError({ statusCode: 402, statusMessage: "unknown user" });
        }

        let nbGameDeleted = 0;
        user.games.forEach((game, index) => {
            if (game.name == gameName && game.universe.name == gameUniverse.name) {
                user.games.splice(index, 1);
                nbGameDeleted++;
            }
        });

        try {
            const ack = await userModel.updateOne({ _id: user_id }, { $set: { games: user.games } }).exec();
            if (ack.modifiedCount == 0) {
                log.error("POST API/game/delete", `Cannot delete game ${gameName} : game not found`, user._id);
                return createError({ statusCode: 402, statusMessage: "game not found" });
            } else if (ack.modifiedCount == 1) log.info("POST API/game/delete", `Game ${gameName} deleted`, user._id);
            else log.warn("POST API/game/delete", `${nbGameDeleted} games ${gameName} deleted`, user._id);

            return {
                statusCode: 200,
                statusMessage: "Delete game successfully",
                message: `Game ${gameName} deleted`,
            } as IAPIResponse;
        } catch (error) {
            log.error("POST API/game/delete", `Cannot delete game ${gameName} : ${error}`, user._id);
            return createError({ statusCode: 500, statusMessage: "Cannot delete game" });
        }
    } catch (error) {
        log.critical("POST API/game/delete", `Cannot connect to DB to find user : ${error}`, user_id);
        return createError({ statusCode: 500, statusMessage: "Cannot delete game" });
    }
});
