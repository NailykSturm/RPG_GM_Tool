import type { ObjectId } from "mongoose";

import { log } from "../../utils/filelogger";
import userModal from "../../models/User";
import type { IUserInfo } from "../../../types/User/IUser";

const caller = "db/user/read";

/**
 * Get the user saved in the database
 * @param id id of the user
 * @returns the informations of the user
 */
export async function getUserById(id: string | ObjectId): Promise<IUserInfo | null> {
    try {
        const user: IUserInfo | null = await userModal.findById(id);
        return user;
    } catch (error) {
        log.critical(`${caller}/getUserId`, `Error while getting user : ${JSON.stringify(error)}`, id);
        return null;
    }
}

/**
 * Get the user save in the database
 * @param mail mail of the user
 * @returns
 */
export async function getUserByMail(mail: string): Promise<IUserInfo | null> {
    try {
        const user: IUserInfo | null = await userModal.findOne({ email: mail.toLowerCase() });
        return user;
    } catch (error) {
        log.critical(`${caller}/getUserByMail`, `Error while getting user : ${JSON.stringify(error)}`, mail);
        return null;
    }
}
