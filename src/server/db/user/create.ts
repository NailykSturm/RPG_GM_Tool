import type { ObjectId } from "mongoose";

import userModal from "../../models/User";
import type { IUserInfo } from "../../../types/User/IUser";

const caller = "db/user/create";

export async function createUser(mail: string, password: string): Promise<IUserInfo | null> {
    try {
        const newUser = await userModal.create({ email: mail.toLowerCase(), password });
        return newUser;
    } catch (error) {
        log.critical(`${caller}/createUser`, `Error while creating user : ${JSON.stringify(error)}`, mail);
        return null;
    }
}
