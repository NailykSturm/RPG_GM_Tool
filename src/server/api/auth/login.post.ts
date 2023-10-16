import { send } from 'h3';
import { validateBody, Type } from 'h3-typebox';
import jwt from 'jsonwebtoken';

import { registerSchema } from '~/server/validations/index';
import userModal from '~/server/models/User';
import { log } from '~/server/utils/log';
import { UserWithoutPassword } from '~/types/IUser';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    try {
        const { email, password } = await validateBody(event, registerSchema);
        const mail = email.toLowerCase();

        log.full('POST API/auth/login', `New login request incoming => user email : ${mail}`, mail);

        try {
            const user = await userModal.findOne({ email: mail });
            if (user) {
                const validatePass = await user.validatePassword(password);
                if (!validatePass) return createError({ statusCode: 400, statusMessage: 'Your password is wrong' });

                const token = jwt.sign({ id: user._id }, config.JWT_ACCESS_SECRET, { expiresIn: process.env.NODE_END === 'production' ? '1d' : '7d' });

                setCookie(event, 'token', token, {
                    maxAge: process.env.NODE_END === 'production' ? 60 * 60 * 8 : 60 * 60 * 24 * 7,
                    httpOnly: true,
                    path: '/',
                    sameSite: true,
                    secure: process.env.NODE_ENV === 'production' ? true : false,
                });

                log.info('POST API/auth/login', `User logged in`, user._id);
                return {_id: user._id, email: user.email} as UserWithoutPassword;
            } else return createError({ statusCode: 400, statusMessage: 'Your email is wrong' });
        } catch (error) {
            log.critical('POST API/auth/login', `Cannot access DB to find a user : ${error}`, email);
            return createError({ statusCode: 500, statusMessage: 'Internal Server error' });
        }
    } catch (error) {
        log.error('POST API/auth/login', `Wrong parameters for register request : ${error}`);
        return error;
    }
});
