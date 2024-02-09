import type { ObjectId } from "mongoose";

import { EBestiaryFieldType } from "./EGame";
import type { IUIBestiaryInfo } from "../User/IUI";
import type { CSelectListElement } from "./CSelectList";

export interface IGameDetails extends IGameInfo {
    script: IScript;
    notebook: INotebook;
}

export interface IGameInfo {
    name: string;
    universe: { name: string; id: ObjectId };
    old_name: string;
    old_universe: string;
    display?: boolean;
}

/* ==================================================== */
/* ===================== BESTIARY ===================== */
/* ==================================================== */

/**
 *  Interface for the bestiary of a game
 *
 */
export interface IBestiary {
    _id: ObjectId;
    owner: ObjectId;
    universe: string;
    fields: IBestiaryField[];
    creatures: IBestiaryCreature[];
}

export interface IListGamesBestiaries {
    games: IGameInfo[];
    bestiaries: IUIBestiaryInfo[];
}
export interface IBestiaryField {
    field: string;
    type: EBestiaryFieldType;
    value?: string | number | boolean;
    options?: CSelectListElement[];
    min?: number;
    max?: number;
    step?: number;
    maxLenght?: number;
    required?: boolean;
}

export interface IBestiaryCreature {
    name: string;
    characteristics: [
        {
            fieldName: string;
            fieldValue: string | number | boolean;
        },
    ];
}

export interface IScript {}
export interface INotebook {}
