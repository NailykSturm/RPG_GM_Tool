import { ObjectId } from 'mongoose';
import { IBestiary, IGameDetails } from './IGame';

export interface IUserInfo {
    _id: ObjectId;
    email: string;
    password: string;
}

export interface IUserComplete extends IUserInfo {
    games: IGameDetails[];
    bestiaries: IBestiary[];
}

export type UserWithoutPassword = Omit<IUserInfo, 'password'>;
