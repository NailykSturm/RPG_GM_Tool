interface IUISelectOption {
    value: CSelectListElement;
    display: boolean;
}

interface ISubCat {
    name: string;
    display: boolean;
    values: IUISelectOption[];
}
interface ICategory {
    name: string | undefined;
    display: boolean;
    subcats: ISubCat[];
    valuesWithoutSubcat: IUISelectOption[];
}

export class CSelectListElement {
    private _value: string;
    private _cat: string | undefined;
    private _subCat: string | undefined;
    private _elt: string | undefined;
    // private static _regexParser: RegExp = new RegExp("");

    // TODO Rendre cette classe générique pour qu'elle puisse prendre un profondeur variable
    constructor(value: string) {
        this._value = value;
        this._setCatSubcatElt();
    }
    /**
     * Get the base value of the element
     * @returns a value like `cat/subcat/elt`
     */
    get value(): string {
        return this._value;
    }
    /**
     * Set the base value of the element
     * @param newValue value to set. Need to be like `cat/subcat/elt`
     */
    setValue(newValue: string) {
        this._value = newValue;
        this._setCatSubcatElt();
    }

    get category() {
        return this._cat;
    }
    get subCategory() {
        return this._subCat;
    }
    get element() {
        return this._elt;
    }
    get parsedElt() {
        return {
            cat: this.category,
            subCat: this.subCategory,
            elt: this.element,
        };
    }

    /**
     * Get the depth of an option
     * @returns the depth, between 1 and 3
     */
    get depth() {
        if (this._value == "") return 0;
        return Math.min(this._value.split("/").length, 3);
    }

    /**
     * Parse one option into it's category / subcategory / element
     * @param value option to parse (with pattern [Category/][Sub-category/]<Element>)
     * @returns the tuple `{cat, subCat, elt}`
     */
    private _setCatSubcatElt() {
        if (!this._value) return { cat: undefined, subCat: undefined, obj: undefined };
        const cats = this._value.split("/");
        let cat: string | undefined, subCat: string | undefined, obj: string | undefined;
        if (cats.length == 1) obj = cats[0];
        else if (cats.length == 2) {
            cat = cats.shift();
            obj = cats.toString();
        } else {
            cat = cats.shift();
            subCat = cats.shift();
            obj = cats.join("/");
        }
        this._cat = cat;
        this._subCat = subCat;
        this._elt = obj;
    }
}

export class CSelectList extends Set<IUISelectOption> {
    constructor() {
        super();
    }

    /**
     * Add an option that it will be added to the options list
     *
     * An option have the folowing pattern : `[Category/][Sub-Category/]<Element>`
     *
     * The category and the sub-category are both optional, but if you give only a sub-category
     * then a category is created instead.
     *
     * *Example :*
     *
     * - `elt` will be parsed as just an element. So it will be find at the root of the tree list
     *
     * - `sub-cat/elt` will be parsed as an element in a category. As Explained earlyar, the category have
     * priority on the Sub-Category. The element will be found under the sub-cat option
     *
     * - `cat/sub-cat/elt` will be parsed as a Category, a Sub-category and an element.
     * It's the basic case of this list, so the element will be found under the cat>sub-cat option
     *
     * - `cat/sub-cat-1/sub-cat-2/elt` will not raise an error. But in these case (and those with more sub-categories)
     * it was the same as the previous example, whereas the element will be labled as `sub-cat-2/elt`
     *
     * @param option Format option to add in the list
     */
    addOption(option: string) {
        let find = false;
        this.forEach((opt) => {
            if (opt.value.value == option) find = true;
        });
        if (!find) this.add({ value: new CSelectListElement(option), display: true });
    }

    /**
     * Get one specific option
     * @param option entire value of the option that is searching
     * @returns the option if found. null otherwise
     */
    getOption(option: string): IUISelectOption | null {
        let elt = null;
        this.forEach((opt) => {
            if (opt.value.value == option) elt = opt;
        });
        return elt;
    }
    /**
     * Get all the options for the frontend
     *
     * For each option, a boolean is given for knows if the element
     * have to be desplayed or not
     * @returns the list of tuple `(element, toDisplay)`
     */
    getOptions() {
        return Array.from(this);
    }
    /**
     * Get all the options for the back-end
     *
     * Each element is standalone, there are no boolean that
     * came with the element
     * @returns the list of `element`
     */
    getOptionsForAPI() {
        return Array.from(this).map((opt) => opt.value);
    }

    /**
     * Remove an option from the whole list
     * @param option The string representing the patter of the option that will be removed
     */
    removeOption(option: string) {
        this.forEach((opt) => {
            if (opt.value.value == option) this.delete(opt);
        });
    }

    /**
     * Reset all diplay values
     * there are all set to true to be desplayed
     */
    resetDisplay() {
        this.forEach((option) => (option.display = true));
    }

    /**
     * Check if the string pattern is in a category, a sub-category or in the element itself
     * display only that thoses who contains the pattern
     * @param option string pattern to test
     */
    includeOption(option: string) {
        this.forEach((opt) => {
            if (opt.value.value.includes(option)) opt.display = true;
            else opt.display = false;
        });
    }

    /**
     * @param value value of the element to retreive in the list
     * @returns the category registered by the element, null if not found
     */
    getCategory(value: string) {
        const elt = this.getOption(value);
        if (elt != null) return elt.value.category;
        return elt;
    }
    /**
     * @param value value of the element to retreive in the list
        game.addOption("cat2/subcat2/element");
        game.addOption("cat2/subcat3/element");
     * @returns the sub-category registered by the element, null if not found
     */
    getSubCategory(value: string) {
        const elt = this.getOption(value);
        if (elt != null) return elt.value.subCategory;
        return elt;
    }
    /**
     * @param value value of the element to retreive in the list
     * @returns the element label registered by the element, null if not found
     */
    getElement(value: string) {
        const elt = this.getOption(value);
        if (elt != null) return elt.value.element;
        return elt;
    }

    /**
     * Create a JSON with all categories, sub-categories and elemnts at root
     *
     * Add some metadata for each to be used in the front-end
     *
     * Each Element is a tuple `{"name", "display"}`
     *
     * Each Sub-Category is a tuple `{"name", "display", values[]}`
     *
     * Each Category is a tuple `{"name", "display", subcat[], values[]}`
     *
     * @returns a JSON with all deferents categories + the elemnts at root
     */
    get listCategories() {
        const categories = {
            cat: [] as ICategory[],
            valueWithoutCat: [] as IUISelectOption[],
        };
        this.forEach((option) => {
            const { cat, subCat, elt: obj } = option.value.parsedElt;
            if (!subCat) {
                if (!cat) {
                    categories.valueWithoutCat.push(option);
                } else {
                    const indexCat = categories.cat.findIndex((c) => c.name == cat);
                    if (indexCat == -1) {
                        categories.cat.push({ name: cat, subcats: [], valuesWithoutSubcat: [], display: false });
                        categories.cat[categories.cat.length - 1].valuesWithoutSubcat.push(option);
                    } else {
                        categories.cat[indexCat].valuesWithoutSubcat.push(option);
                    }
                }
            } else {
                const indexCat = categories.cat.findIndex((c) => c.name == cat);
                if (indexCat == -1) {
                    categories.cat.push({ name: cat, subcats: [], valuesWithoutSubcat: [], display: false });
                    categories.cat[categories.cat.length - 1].subcats.push({ name: subCat, values: [option], display: false });
                } else {
                    const indexSubCat = categories.cat[indexCat].subcats.findIndex((sc) => sc.name == subCat);
                    if (indexSubCat == -1) {
                        categories.cat[indexCat].subcats.push({ name: subCat, values: [option], display: false });
                    } else {
                        categories.cat[indexCat].subcats[indexSubCat].values.push(option);
                    }
                }
            }
        });

        categories.cat.forEach((cat) => {
            cat.subcats.forEach((subcat) => {
                subcat.values.forEach((value) => {
                    if (value.display) {
                        cat.display = true;
                        subcat.display = true;
                    }
                });
            });
            cat.valuesWithoutSubcat.forEach((value) => {
                if (value.display) {
                    cat.display = true;
                }
            });
        });

        return {
            cat: Array.from(new Set([...categories.cat])),
            valueWithoutCat: Array.from(new Set([...categories.valueWithoutCat])),
        };
    }
}
