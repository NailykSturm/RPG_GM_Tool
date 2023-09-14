import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import type { IUserComplete } from '~~/src/types/IUser';
import { BestiarySchema, GameSchema } from '~~/src/types/IGame';

interface IUserDocument extends IUserComplete, Document {
    validatePassword: (data: string) => Promise<boolean>;
}

const UserSchema: mongoose.Schema = new mongoose.Schema<IUserComplete>(
    {
        email: { type: String, requied: true },
        password: { type: String, requied: true },
        games: { type: [GameSchema], default: []},
        bestiaries: { type: [BestiarySchema], default: []}
    },
    { timestamps: true }
);

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();
    try {
        user.password = await bcrypt.hash(user.password, 10);
        return next();
    } catch (e) {
        return next(e);
    }
});

UserSchema.methods.validatePassword = async function validatePassword(password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model<IUserDocument>('users', UserSchema);
