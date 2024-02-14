import type { ObjectId } from "mongoose";

import userModal, { userDocumentIntoUserComplete } from "../../models/User";
import type { IUserCompleteSave, IUserInfo } from "../../../types/User/IUser";
import { getUserByMail } from "./read";
import { log } from "../../utils/filelogger";

const caller = "db/user/create";

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
