import type { ObjectId } from "mongoose";
import userModal from "../../models/User";
import type { IUserInfo } from "../../../types/User/IUser";

/**
 * Get the user saved in the database
 * @param id id of the user
 * @returns the informations of the user
 */
export async function getUserByName(id: string | ObjectId): Promise<IUserInfo | null> {
    const user: IUserInfo | null = await userModal.findById(id);
    return user;
}
