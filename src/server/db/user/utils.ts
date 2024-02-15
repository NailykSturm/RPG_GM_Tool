import userModal from "../../models/User";
import type { IUserCompleteSave } from "../../../types/User/IUser";

const caller = "db/user/utils";

/**
 * Validate the password of a user
 * @param usr user to validate
 * @param password password to validate
 * @returns if the password is the same as the user's password
 */
export async function validatePassword(usr: IUserCompleteSave, password: string): Promise<boolean> {
    const user = await userModal.findById(usr._id);
    if (user) {
        return user.validatePassword(password);
    }
    return false;
}
