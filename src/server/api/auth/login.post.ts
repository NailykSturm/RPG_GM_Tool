import { send } from 'h3';
import { validateBody, Type } from 'h3-typebox';
import jwt from 'jsonwebtoken';

import { registerSchema } from '~/server/validations/index';
import userModal from '~/server/models/User';

export default defineEventHandler(async (event) => {
    const config = useRuntimeConfig();

    const { email, password } = await validateBody(event, registerSchema);
    const mail = email.toLowerCase();

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

        return user;
    } else return createError({ statusCode: 400, statusMessage: 'Your email is wrong' });
});
