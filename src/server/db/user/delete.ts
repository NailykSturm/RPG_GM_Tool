import type { ObjectId } from "mongoose";

import userModal from "../../models/User";
import { getUserByMail } from "./read";

const caller = "db/user/delete";

/**
 * Delete a user from the database
 * @param id id of the user
 * @returns the feedback of the deletion
 */
export async function deleteUserById(id: string | ObjectId) {
    try {
        const feedback = await userModal.findByIdAndDelete(id);
        log.debug(`${caller}/deleteUserById`, `feedback: ${feedback}`, id);
        return feedback;
    } catch (error) {
        log.critical(`${caller}/deleteUserById`, `Error while deleting user : ${JSON.stringify(error)}`, id);
    }
}
/**
 * Delete a user from the database
 * @param mail mail of the user
 * @returns the feedback of the deletion
 */
export async function deleteUserByMail(mail: string) {
    const user = await getUserByMail(mail);
    if (user) {
        return deleteUserById(user._id);
    }
    return null;
}
