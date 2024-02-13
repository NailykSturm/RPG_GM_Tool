import { H3Event } from "h3";
import jwt, { type JwtPayload } from "jsonwebtoken";

import type { IUserInfo } from "../../types/User/IUser";
import { getUserById } from "../db/user/read";

export default async function (event: H3Event): Promise<IUserInfo | null> {
    const cookies = parseCookies(event);
    const token = cookies?.token;
    if (!token) return null; // throw new Error("no token");

    const secret = process.env.JWT_ACCESS_SECRET ?? "";
    const { id } = <JwtPayload>jwt.verify(token, secret);

    const user: IUserInfo | null = await getUserById(id);
    if (!user) return null; // throw new Error('no user');

    return user;
}
