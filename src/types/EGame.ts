export enum EBestiaryFieldType {
    'Input',        // string : Field with free value 
    'Select',       // string : Field with a list of values
    'Checkbox',     // boolean: Field that can be true or false
    'Spinner'       // number : Field with a number value, that can be incremented or decremented
};
export enum EBestiaryFieldOption {
    'Min',          // number : Minimum value for the field (only for Spinner, default 0)
    'Max',          // number : Maximum value for the field (only for Spinner, default 100)
    'Step',         // number : Step value for the field (only for Spinner, default 1)
    'Options',      // string[] : List of values for the field (only for Select)
    'MaxLenght',    // number : Maximum number of characters for the field (only for Input)
    'Required',     // boolean : Field is required
};
