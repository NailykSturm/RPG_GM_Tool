import { CSelectList, CSelectListElement } from "../Game/CSelectList";
import { EBestiaryFieldType } from "../Game/EGame";

export interface IUIBestiaryField {
    field: string;
    value: string | number | boolean;
    type: EBestiaryFieldType;
    options?: CSelectList;
    min?: number;
    max?: number;
    step?: number;
    maxLenght?: number;
    required?: boolean;
}

export interface IUIBestiaryInfo {
    universe: string;
    display: boolean;
}
