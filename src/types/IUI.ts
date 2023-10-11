export interface IUIBestiaryInfo {
    universe: string,
    display: boolean,
};

export interface IUISelectOption {
    value: string,
    display: boolean,
};
export interface IUISelect {
    values: IUISelectOption[] | Record<string, IUISelectOption[] | Record<string, IUISelectOption[]>>,
};