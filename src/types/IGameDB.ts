import mongoose from 'mongoose';
import { IGameDetails } from './IGame';

const UniverseSchema: mongoose.Schema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        id: { type: String, required: true },
    },
    { timestamps: false, _id: false }
);

export const GameSchema: mongoose.Schema = new mongoose.Schema<IGameDetails>(
    {
        name: { type: String, requied: true },
        universe: { type: UniverseSchema, requied: true },
        script: { type: Object, default: {} },
        notebook: { type: Object, default: {} },
    },
    { timestamps: false, _id: false }
);
