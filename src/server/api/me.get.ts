import type { UserWithoutPassword } from "../../types/User/IUser";
import { defineAuthenticatedEventHandler } from "../../server/utils/defineAuthenticatedEventHandler";

export default defineAuthenticatedEventHandler((_, user) => {
    if (user == null) return null;
    return { _id: user._id, email: user.email } as UserWithoutPassword;
});
