import { Type } from "h3-typebox";

export const gameInfoSchema = Type.Object({
    gameUniverse: Type.Object({
        id: Type.Any(),
        name: Type.String(),
    }),
    gameName: Type.String(),
    user_id: Type.String(),
});

export const gameInfoUpdateSchema = Type.Object({
    gameUniverse: Type.Object({
        id: Type.Any(),
        name: Type.String(),
    }),
    gameName: Type.String(),
    old_name: Type.String(),
    old_universe: Type.String(),
    user_id: Type.String(),
});
