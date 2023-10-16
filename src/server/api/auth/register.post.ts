import { validateBody } from 'h3-typebox';

import { registerSchema } from '~/server/validations/index';
import UserModal from '~/server/models/User';
import { log } from '~/server/utils/log';

export default defineEventHandler(async (event) => {
    try {
        const { email, password } = await validateBody(event, registerSchema);

        log.debug('POST API/auth/register', `New register request incoming => new user email : ${email}`, email)

        try {
            const mail = email.toLowerCase();
            const user = await UserModal.findOne({ email: mail });
            if (user) {
                log.info('POST API/auth/register', `Email already used => ${user}`, email)
                return createError({ statusCode: 400, statusMessage: 'Email already used' });
            }

            try {
                const newUser = await UserModal.create({ email: mail, password });
                if (!newUser) {
                    log.error('POST API/auth/register', `Cannot register new user`, email)
                    return createError({ statusCode: 500, statusMessage: 'Cannot create user' });
                }
                log.info('POST API/auth/register', `New user registered => ${newUser}`, newUser.email);
                return { code: 200, message: 'Account created' };

            } catch (error) {
                log.error('POST API/auth/register', `Cannot register new user : ${error}`, email)
                return createError({ statusCode: 500, statusMessage: 'Cannot create user' });
            }

        } catch (error) {
            log.error('POST API/auth/register', `Cannot access DB to find a user : ${error}`, email)
            return createError({ statusCode: 500, statusMessage: 'Internal Server error' });
        }
    } catch (error) {
        log.error('POST API/auth/register', `Wrong parameters for register request : ${error.statusMessage}`);
        return error;
    }
});
