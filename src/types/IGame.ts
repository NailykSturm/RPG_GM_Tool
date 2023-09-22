import mongoose, { ObjectId } from "mongoose";

export interface IScript { }
export interface INotebook { }

export interface IGameDetails extends IGameInfo {
    script: IScript,
    notebook: INotebook,
}

export interface IGameInfo {
    name: string;
    universe: string;
    old_name: string;
    old_universe: string;
}

export const emptyGame: IGameInfo = { name: '', universe: '', old_name: '', old_universe: '' };

export enum EBestiaryFieldType {
    'Input',        // string : Field with free value 
    'Select',       // string : Field with a list of values
    'Checkbox',     // boolean: Field that can be true or false
    'Spinner'       // number : Field with a number value, that can be incremented or decremented
}
export enum EBestiaryFieldOption {
    'Min',          // number : Minimum value for the field (only for Spinner, default 0)
    'Max',          // number : Maximum value for the field (only for Spinner, default 100)
    'Step',         // number : Step value for the field (only for Spinner, default 1)
    'Options',      // string[] : List of values for the field (only for Select)
    'MaxLenght'     // number : Maximum number of characters for the field (only for Input)
}

export interface IBestiary {
    universe: string;
    creatures: IBestiaryCreature[];
}
export interface IBestiaryInfo {
    universe: string,
    display: boolean,
}

export interface IBestiaryCreature {
    field: string;
    value: string | number | boolean;
    type: EBestiaryFieldType;
    options?: EBestiaryFieldOption[];
}
export const bestiaryFieldTypes = [
    { value: EBestiaryFieldType.Input, label: 'Input', type: 'string', desc: 'Field with free value ' },
    { value: EBestiaryFieldType.Select, label: 'Select', type: 'string', desc: 'Field with a list of values' },
    { value: EBestiaryFieldType.Checkbox, label: 'Checkbox', type: 'boolean', desc: 'Field that can be true or false' },
    { value: EBestiaryFieldType.Spinner, label: 'Spinner', type: 'number', desc: 'Field with a number value, that can be incremented or decremented' },
]
export const bestiaryFieldOptions = [
    { value: EBestiaryFieldOption.Min, label: 'Min', type: 'number', desc: 'Minimum value for the field (only for Spinner, default 0)' },
    { value: EBestiaryFieldOption.Max, label: 'Max', type: 'number', desc: 'Maximum value for the field (only for Spinner, default 100)' },
    { value: EBestiaryFieldOption.Step, label: 'Step', type: 'number', desc: 'Step value for the field (only for Spinner, default 1)' },
    { value: EBestiaryFieldOption.Options, label: 'Options', type: 'string[]', desc: 'List of values for the field (only for Select)' },
    { value: EBestiaryFieldOption.MaxLenght, label: 'MaxLenght', type: 'number', desc: 'Maximum number of characters for the field (only for Input)' },
]


export const GameSchema: mongoose.Schema = new mongoose.Schema<IGameDetails>(
    {
        name: { type: String, requied: true },
        universe: { type: String, requied: true },
        script: { type: Object, default: {} },
        notebook: { type: Object, default: {} },
    },
    { timestamps: true }
);
export const BestiaryCreatureSchema: mongoose.Schema = new mongoose.Schema<IBestiaryCreature>(
    {
        field: { type: String, requied: true },
        value: { type: String, requied: true },
        type: { type: Number, requied: true },
        options: new mongoose.Schema({
            min: { type: Number, requied: false },
            max: { type: Number, requied: false },
            step: { type: Number, requied: false },
            options: { type: [String], requied: false },
            maxLenght: { type: Number, requied: false },
        }, { timestamps: true }),
    },
    { timestamps: true }
);
export const BestiarySchema: mongoose.Schema = new mongoose.Schema<IBestiary>(
    {
        universe: { type: String, requied: true },
        creatures: BestiaryCreatureSchema,
    },
    { timestamps: true }
);