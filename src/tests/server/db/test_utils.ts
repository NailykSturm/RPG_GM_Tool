import type { ObjectId } from "mongoose";

import type { IUserInfo } from "../../../types/User/IUser";

export const userTest: IUserInfo = {
    _id: null as unknown as ObjectId,
    email: "test_user@test.dev",
    password: "test_password",
};
