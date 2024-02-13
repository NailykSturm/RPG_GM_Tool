import { validateBody } from "h3-typebox";
import jwt from "jsonwebtoken";

import { registerSchema } from "../../validations/user";
import { log } from "../../utils/filelogger";
import type { UserWithoutPassword } from "../../../types/User/IUser";
import { validatePassword } from "../../db/user/utils";
import { getUserByMail } from "../../db/user/read";

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    try {
        const { email, password } = await validateBody(event, registerSchema);
        log.full("POST API/auth/login", `New login request incoming => user email : ${email}`, email);

        const user = await getUserByMail(email);
        if (user) {
            const validatePass = await validatePassword(user._id, password);
            if (!validatePass) return createError({ statusCode: 400, statusMessage: "Your password is wrong" });

            const token = jwt.sign({ id: user._id }, config.JWT_ACCESS_SECRET, {
                expiresIn: config.END === "prod" ? "1d" : "7d",
            });

            setCookie(event, "token", token, {
                maxAge: config.END === "prod" ? 60 * 60 * 8 : 60 * 60 * 24 * 7,
                httpOnly: true,
                path: "/",
                sameSite: true,
                secure: config.ENV === "prod" ? true : false,
            });

            log.info("POST API/auth/login", `User logged in`, user._id);
            return { _id: user._id, email: user.email } as UserWithoutPassword;
        } else return createError({ statusCode: 400, statusMessage: "Your email is wrong" });
    } catch (error) {
        log.error("POST API/auth/login", `Wrong parameters for register request : ${error}`);
        return error;
    }
});
