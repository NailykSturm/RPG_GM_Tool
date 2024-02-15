import userModal, { userDocumentIntoUserComplete } from "../../models/User";
import type { IUserCompleteSave } from "../../../types/User/IUser";
import { getUserByMail } from "./read";
import { log } from "../../utils/filelogger";

const caller = "db/user/create";

/**
 * Create a new user in the database
 * @param mail mail of the user (unique)
 * @param password password of the user
 * @returns the informations of the user if the user is created, null otherwise
 */
export async function createUser(mail: string, password: string): Promise<IUserCompleteSave | null> {
    try {
        const aleradyExist = await getUserByMail(mail);
        if (aleradyExist) {
            return null;
        }
        const newUser = await userModal.create({ email: mail.toLowerCase(), password });
        log.info(`${caller}/createUser`, `User created : ${JSON.stringify(userDocumentIntoUserComplete(newUser))}`, mail);
        return userDocumentIntoUserComplete(newUser);
    } catch (error) {
        log.critical(`${caller}/createUser`, `Error while creating user : ${JSON.stringify(error)}`, mail);
        return null;
    }
}
