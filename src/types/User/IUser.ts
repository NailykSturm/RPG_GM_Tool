import type { ObjectId } from "mongoose";
import type { IBestiary, IGameDetails } from "../Game/IGame";

export interface IUserCreditentials {
    email: string;
    password: string;
}

export interface IUserInfo {
    _id: ObjectId;
    email: string;
    password: string;
}

export interface IUserComplete extends IUserInfo {
    games: IGameDetails[];
}

export type IUserCompleteSave = Omit<IUserComplete, "password">;
export type UserWithoutPassword = Omit<IUserInfo, "password">;
