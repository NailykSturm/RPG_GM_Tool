import { CSelectList } from './CGame';
import { EBestiaryFieldType } from './EGame';

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

export interface IUISelectOption {
    value: string;
    display: boolean;
}
export interface IUISelect {
    values: IUISelectOption[] | Record<string, IUISelectOption[] | Record<string, IUISelectOption[]>>;
}
