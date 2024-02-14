import type { ObjectId } from "mongoose";

import { log } from "../../utils/filelogger";
import userModal, { userDocumentIntoUserComplete } from "../../models/User";
import { getUserByMail } from "./read";

const caller = "db/user/delete";

/**
 * Delete a user from the database
 * @param id id of the user
 * @returns the feedback of the deletion
 */
export async function deleteUserById(id: ObjectId): Promise<boolean> {
    try {
        const deletedUser = await userModal.findByIdAndDelete(id);
        if (!deletedUser) return false;
        log.info(`${caller}/deleteUserById`, `user deleted: ${JSON.stringify(userDocumentIntoUserComplete(deletedUser))}`, id);
        return true;
    } catch (error) {
        log.critical(`${caller}/deleteUserById`, `Error while deleting user : ${JSON.stringify(error)}`, id);
        return false;
    }
}
/**
 * Delete a user from the database
 * @param mail mail of the user
 * @returns the feedback of the deletion
 */
export async function deleteUserByMail(mail: string): Promise<boolean> {
    const user = await getUserByMail(mail);
    if (!user) return false;
    log.trace(`${caller}/deleteUserByMail`, `delete user from mail: ${JSON.stringify(user)}`, user?._id);
    if (user) {
        return deleteUserById(user._id);
    }
    return false;
}
