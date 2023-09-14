import { Type } from 'h3-typebox';

export const registerSchema = Type.Object({
    email: Type.String(),
    password: Type.String(),
});

export const loginSchema = Type.Object({
    email: Type.String(),
    password: Type.String(),
});

export const newGameSchema = Type.Object({
    newGameUniverse: Type.String(),
    newGameName: Type.String(),
    user_id: Type.String(),
});