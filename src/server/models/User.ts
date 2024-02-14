import mongoose from "mongoose";
import bcrypt from "bcrypt";

import type { IUserComplete, IUserCompleteSave } from "../../types/User/IUser";
import { GameSchema } from "../../types/Game/IGameDB";

interface IUserDocument extends IUserComplete, Document {
    validatePassword: (data: string) => Promise<boolean>;
}

const UserSchema: mongoose.Schema = new mongoose.Schema<IUserComplete>(
    {
        email: { type: String, requied: true },
        password: { type: String, requied: true },
        games: { type: [GameSchema], default: [] },
    },
    { timestamps: true }
);

UserSchema.pre("save", async function (next) {
    const user = this;
    if (!user.isModified("password")) return next();
    try {
        user.password = await bcrypt.hash(user.password, 10);
        return next();
    } catch (e: any) {
        return next(e);
    }
});

UserSchema.methods.validatePassword = async function validatePassword(password: string) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUserDocument>("users", UserSchema);

/**
 * Parse a user document into a object with only the informations that the API or the client can see/use
 * @param user user document to parse
 * @returns a user object with the minimal informations needed
 */
export function userDocumentIntoUserComplete(user: IUserDocument): IUserCompleteSave {
    return {
        email: user.email,
        games: user.games,
        _id: user._id,
    };
}
