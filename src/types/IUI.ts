export interface IUIBestiaryInfo {
    universe: string,
    display: boolean,
};

export interface IUISelectOption {
    value: string,
    display: boolean,
};
export interface IUISelectSubCat {
    name: string,
    values: IUISelectOption[],
};
export interface IUISelectCat {
    name: string,
    values: IUISelectSubCat[] | IUISelectOption[],
};
export interface IUISelect {
    values: IUISelectCat[] | IUISelectOption[],
};