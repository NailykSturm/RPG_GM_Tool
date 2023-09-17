import { validateBody } from 'h3-typebox';

import { registerSchema } from '~/server/validations/index';
import UserModal from '~/server/models/User';
import { log, logLv } from '~/server/utils/log';

export default defineEventHandler(async (event) => {
    try {
        const { email, password } = await validateBody(event, registerSchema);

        log(logLv.FULL, 'POST API/auth/register', `New register request incoming => new user email : ${email}`, email)

        try {
            const mail = email.toLowerCase();
            const user = await UserModal.findOne({ email: mail });
            if (user) {
                log(logLv.INFO, 'POST API/auth/register', `Email already used => ${user}`, email)
                return createError({ statusCode: 400, statusMessage: 'Email already used' });
            }

            try {
                const newUser = await UserModal.create({ email: mail, password });
                if (!newUser) {
                    log(logLv.ERROR, 'POST API/auth/register', `Cannot register new user`, email)
                    return createError({ statusCode: 500, statusMessage: 'Cannot create user' });
                }
                log(logLv.INFO, 'POST API/auth/register', `New user registered => ${newUser}`, newUser.email);
                return { code: 200, message: 'Account created' };

            } catch (error) {
                log(logLv.ERROR, 'POST API/auth/register', `Cannot register new user : ${error}`, email)
                return createError({ statusCode: 500, statusMessage: 'Cannot create user' });
            }

        } catch (error) {
            log(logLv.CRITICAL, 'POST API/auth/register', `Cannot access DB to find a user : ${error}`, email)
            return createError({ statusCode: 500, statusMessage: 'Internal Server error' });
        }
    } catch (error) {
        log(logLv.INFO, 'POST API/auth/register', `Wrong parameters for register request : ${error.statusMessage}`);
        return error;
    }
});
