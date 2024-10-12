import { validateBody } from "h3-typebox";

import { registerSchema } from "../../validations/user";
import { log } from "../../utils/filelogger";
import { createUser } from "../../db/user/create";
import { getUserByMail } from "../../db/user/read";
import type { IAPIResponse } from "../../../types/API/IAPI";
import type { IUserCompleteSave } from "../../../types/User/IUser";

export default defineEventHandler(async (event) => {
    try {
        const { email, password } = await validateBody(event, registerSchema);
        const mail = email.toLowerCase();

        log.debug("POST API/auth/register", `New register request incoming => new user email : ${mail}`, mail);

        let user = await getUserByMail(mail);
        if (user) {
            log.info("POST API/auth/register", `Email already used => ${user}`, email);
            return createError({ statusCode: 400, statusMessage: "Email already used" });
        }

        user = await createUser(mail, password);
        if (!user) {
            log.error("POST API/auth/register", `Cannot register new user`, email);
            return createError({ statusCode: 500, statusMessage: "Cannot create user" });
        }
        log.info("POST API/auth/register", `New user registered => ${user}`, user.email);
        return { statusCode: 200, statusMessage: "Account created", data: user } as IAPIResponse<IUserCompleteSave>;
    } catch (error: any) {
        log.error("POST API/auth/register", `Wrong parameters for register request : ${error}`);
        return error;
    }
});
