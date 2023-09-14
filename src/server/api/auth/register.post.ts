import { H3Error } from 'h3';
import { validateBody, Type } from 'h3-typebox';

import { registerSchema } from '~/server/validations/index';
import UserModal from '~/server/models/User';

export default defineEventHandler(async (event) => {
    const { email, password } = await validateBody(event, registerSchema);

    const mail = email.toLowerCase();
    console.log(`New user request incoming => new user mail : ${mail}`);
    const user = await UserModal.findOne({ email: mail });
    if (user) return createError({ statusCode: 400, statusMessage: 'Email already user' });

    const newUser = await UserModal.create({ email: mail, password });
    console.log('New user created ? => ', newUser);
    if (!newUser) return createError({ statusCode: 500, statusMessage: 'Cannot create user' });
    return { code: 200, message: 'Account created' };
});
