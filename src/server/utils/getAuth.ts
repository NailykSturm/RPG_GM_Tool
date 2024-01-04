import { CompatibilityEvent } from 'h3';
import jwt from 'jsonwebtoken';

import type { IUserInfo } from '~/types/IUser';
import userModal from '~/server/models/User';

export default async function (event: CompatibilityEvent): Promise<IUserInfo | null> {
    const { token } = useCookies(event);
    if (!token) return null; // throw new Error('no token');

    const { id } = jwt.verify(token, process.env.JWT_ACCESS_SECRET);

    const user: IUserInfo = await userModal.findById(id);
    if (!user) return null; // throw new Error('no user');

    return user;
}
