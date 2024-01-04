import mongoose from 'mongoose';

import { IBestiary, IBestiaryCreature, IBestiaryField } from '~/types/IGame';

const BestiaryFieldSchema: mongoose.Schema = new mongoose.Schema<IBestiaryField>(
    {
        field: { type: String, required: true },
        type: { type: Number, required: true },
        options: new mongoose.Schema(
            {
                min: { type: Number },
                max: { type: Number },
                step: { type: Number },
                options: { type: [String] },
                maxLenght: { type: Number },
            },
            { timestamps: false, _id: false }
        ),
    },
    { timestamps: false, _id: false }
);

const CreatureCharacteristicSchema: mongoose.Schema = new mongoose.Schema(
    {
        fieldName: { type: String, required: true },
        fieldValue: { type: String || Number || Boolean, required: true },
    },
    { timestamps: false, _id: false }
);

const BestiaryCreatureSchema: mongoose.Schema = new mongoose.Schema<IBestiaryCreature>(
    {
        name: { type: String, required: true },
        characteristics: { type: [CreatureCharacteristicSchema], default: [] },
    },
    { timestamps: false, _id: false }
);

const BestiarySchema: mongoose.Schema = new mongoose.Schema<IBestiary>(
    {
        owner: { type: String, requied: true },
        universe: { type: String, requied: true },
        fields: { type: [BestiaryFieldSchema], default: [] },
        creatures: { type: [BestiaryCreatureSchema], default: [] },
    },
    { timestamps: true }
);

export default mongoose.model<IBestiary>('bestiaries', BestiarySchema);
