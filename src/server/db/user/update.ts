import type { IUserCreditentials } from "../../../types/User/IUser";
import { validatePassword } from "./utils";
import userModel from "../../models/User";
import { log } from "../../utils/filelogger";

const caller = "db/user/update";

/**
 * Change the password of a user
 * @param user user who want to change his password
 * @param newPassword new password to set
 * @returns if the password has been changed
 */
export async function changePassword(user: IUserCreditentials, newPassword: string): Promise<boolean> {
    const dbUser = await userModel.findOne({ email: user.email });
    if (!dbUser) {
        log.error(`${caller}/changePassword`, `User not found`, user.email);
        return false;
    }
    const pswdValidated = await validatePassword(dbUser, user.password);
    if (!pswdValidated) {
        log.info(`${caller}/changePassword`, `Wrong password`, dbUser._id);
        return false;
    }
    log.trace(`${caller}/changePassword`, `Before password changed : ${dbUser.password}`, dbUser._id);
    dbUser.password = newPassword;
    const saved = await dbUser.save();
    if (!saved) {
        log.error(`${caller}/changePassword`, `Error while saving the new password`, dbUser._id);
        return false;
    }
    log.trace(`${caller}/changePassword`, `After Password changed : ${saved.password}`, dbUser._id);
    return true;
}
