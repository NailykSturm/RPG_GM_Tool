import { EBestiaryFieldType } from "./EGame";
import { IUIBestiaryInfo, IUISelect } from "./IUI";

export interface IGameDetails extends IGameInfo {
    script: IScript,
    notebook: INotebook,
};

export interface IGameInfo {
    name: string;
    universe: string;
    old_name: string;
    old_universe: string;
    display?: boolean;
};


/* ==================================================== */
/* ===================== BESTIARY ===================== */
/* ==================================================== */

/**
 *  Interface for the bestiary of a game
 * 
 */
export interface IBestiary {
    universe: string;
    fields: IBestiaryField[];
    creatures: IBestiaryCreature[];
};

export interface IListGamesBestiaries {
    games: IGameInfo[],
    bestiaries: IUIBestiaryInfo[],
};
export interface IBestiaryField {
    field: string;
    value: string | number | boolean;
    type: EBestiaryFieldType;
    options?: string[] | Record<string, string[] | Record<string, string[]>> | IUISelect;
    min?: number;
    max?: number;
    step?: number;
    maxLenght?: number;
    required?: boolean;
};

export interface IBestiaryCreature {
    name: string;
    characteristics: [{
        fieldName: string;
        fieldValue: string | number | boolean;
    }]
};

export interface IScript { };
export interface INotebook { };