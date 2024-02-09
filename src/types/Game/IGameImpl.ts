import type { ObjectId } from "mongoose";

import { EBestiaryFieldType } from "./EGame";
import type { IGameInfo, IBestiaryField, IBestiary } from "./IGame";
import type { IUIBestiaryField } from "../User/IUI";

export const emptyGame: IGameInfo = {
    name: "",
    universe: { id: "" as unknown as ObjectId, name: "" },
    old_name: "",
    old_universe: "",
};
export const bestiaryFieldTypes = [
    { field: EBestiaryFieldType.Input, label: "Input", type: "string", desc: "Field with free value " },
    { field: EBestiaryFieldType.Select, label: "Select", type: "string", desc: "Field with a list of values" },
    { field: EBestiaryFieldType.Checkbox, label: "Checkbox", type: "boolean", desc: "Field that can be true or false" },
    {
        field: EBestiaryFieldType.Spinner,
        label: "Spinner",
        type: "number",
        desc: "Field with a number value, that can be incremented or decremented",
    },
];

// export const bestiaryFieldOptions = [
//     { name: EBestiaryFieldOption.Min, usedBy: EBestiaryFieldType.Spinner, label: 'Min', type: 'number', value: 0,desc: 'Minimum value for the field (default 0)' },
//     { name: EBestiaryFieldOption.Max, usedBy: EBestiaryFieldType.Spinner, label: 'Max', type: 'number', value: 100, desc: 'Maximum value for the field (default 100)' },
//     { name: EBestiaryFieldOption.Step, usedBy: EBestiaryFieldType.Spinner, label: 'Step', type: 'number', value: 1, desc: 'Step value for the field (default 1)' },
//     { name: EBestiaryFieldOption.Options, usedBy: EBestiaryFieldType.Select, label: 'Options', type: 'string[]', value: [], desc: 'List of values for the field' },
//     { name: EBestiaryFieldOption.MaxLenght, usedBy: EBestiaryFieldType.Input, label: 'MaxLenght', type: 'number', value: 50, desc: 'Maximum number of characters for the field (default: 50)' },
//     { name: EBestiaryFieldOption.Required, label: 'Required', type: 'boolean', value: false, desc: 'Is the field required ? (default: false)' },
// ];
export const emptyUIBestiaryField: IUIBestiaryField = {
    field: "Default",
    value: "Default",
    type: EBestiaryFieldType.Input,
    min: 0,
    max: 100,
    step: 1,
    maxLenght: 50,
    required: false,
};
export const emptyBestiaryField: IBestiaryField = {
    field: "Default",
    value: "Default",
    type: EBestiaryFieldType.Input,
    min: 0,
    max: 100,
    step: 1,
    maxLenght: 50,
    required: false,
};
