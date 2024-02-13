import type { ObjectId } from "mongoose";

import userModal from "../../models/User";

const caller = "db/user/utils";

export async function validatePassword(id: string | ObjectId, password: string): Promise<boolean> {
    const user = await userModal.findById(id);
    if (user) {
        return user.validatePassword(password);
    }
    return false;
}
