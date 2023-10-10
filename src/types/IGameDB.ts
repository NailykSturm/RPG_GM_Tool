import mongoose from "mongoose";
import { IBestiary, IBestiaryField, IGameDetails } from "./IGame";

export const GameSchema: mongoose.Schema = new mongoose.Schema<IGameDetails>(
    {
        name: { type: String, requied: true },
        universe: { type: String, requied: true },
        script: { type: Object, default: {} },
        notebook: { type: Object, default: {} },
    },
    { timestamps: true, _id: false },
);
export const BestiaryCreatureSchema: mongoose.Schema = new mongoose.Schema<IBestiaryField>(
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
        }, { timestamps: true, _id: false }),
    },
    { timestamps: true, _id: false },
);
export const BestiarySchema: mongoose.Schema = new mongoose.Schema<IBestiary>(
    {
        universe: { type: String, requied: true },
        creatures: BestiaryCreatureSchema,
    },
    { timestamps: true, _id: false },
);