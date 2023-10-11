import { IUISelectOption } from "~/types/IUI";

export class CSelectList {

    _options: Set<IUISelectOption>;

    constructor() {
        this._options = new Set();
        this.addOption('default/test1');
        this.addOption('default/test2');
        this.addOption('default/test3');
        this.addOption('default/test4');
        this.addOption('arme/melee/melee1');
        this.addOption('arme/melee/melee2');
        this.addOption('arme/melee/melee3');
        this.addOption('arme/melee/melee4');
        this.addOption('arme/distance/dist1');
        this.addOption('arme/distance/dist2');
        this.addOption('arme/distance/dist3');
        this.addOption('arme/distance/dist4');
        this.addOption('armure/legere/legere1');
        this.addOption('armure/legere/legere2');
        this.addOption('armure/legere/legere3');
        this.addOption('armure/legere/legere4');
        this.addOption('arme/dummyWeapon1');
        this.addOption('arme/dummyWeapon2');
        this.addOption('arme/dummyWeapon3');
        this.addOption('arme/dummyWeapon4');
        this.addOption('armure/moyenne/moyenne1');
        this.addOption('armure/moyenne/moyenne2');
        this.addOption('armure/moyenne/moyenne3');
        this.addOption('armure/moyenne/moyenne4');
        this.addOption('armure/lourde/lourde1');
        this.addOption('armure/lourde/lourde2');
        this.addOption('armure/lourde/lourde3');
        this.addOption('armure/lourde/lourde4');
        this.addOption('bouclier/bouclier1');
        this.addOption('bouclier/bouclier2');
        this.addOption('bouclier/bouclier3');
        this.addOption('bouclier/bouclier4');
        this.addOption('random1');
        this.addOption('random2');
        this.addOption('random3');
        this.addOption('random4');
    }

    addOption(option: string) {
        console.log(option);
        let find = false;
        this._options.forEach(opt => { if (opt.value == option) find = true });
        if (!find) this._options.add({ value: option, display: true });
    }
    removeOption(option: string) {
        this._options.forEach(opt => { if (opt.value == option) this._options.delete(opt) });
    }
    getOptions() {
        return Array.from(this._options);
    }
    resetDisplay() {
        this._options.forEach(option => option.display = true);
    }
    includeOption(option: string) {
        const { cat, subCat, obj } = this._splitValue(option);
        this._options.forEach(opt => {
            const { cat: c, subCat: sc, obj: o } = this._splitValue(opt.value);

            if (!subCat) {
                if (!cat) {
                    if ((o && o.includes(obj)) || (sc && sc.includes(obj)) || (c && c.includes(obj))) opt.display = true;
                    else opt.display = false;
                } else {
                    if (((c && c.includes(cat)) || (sc && sc.includes(cat))) && ((o && o.includes(obj)) || (sc && sc.includes(obj)))) opt.display = true;
                    else opt.display = false;
                }
            } else {
                if ((c && c.includes(cat)) && (sc && sc.includes(subCat)) && (o && o.includes(obj))) opt.display = true;
                else opt.display = false;
            }
        })
    }

    private _splitValue(value: string) {
        if (!value) return { cat: undefined, subCat: undefined, obj: undefined };
        const cats = value.split('/');
        let cat: string, subCat: string, obj: string = undefined;
        if (cats.length == 1) obj = cats[0];
        else if (cats.length == 2) {
            cat = cats.shift();
            obj = cats.toString();
        }
        else {
            cat = cats.shift();
            subCat = cats.shift();
            obj = cats.toString();
        }
        return { cat, subCat, obj };
    }
    getCategory(value: string) {
        return this._splitValue(value).cat;
    }
    getSubCategory(value: string) {
        return this._splitValue(value).subCat;
    }
    getElement(value: string) {
        return this._splitValue(value).obj;
    }
    getDeep(value: string) {
        return Math.min(value.split('/').length, 3);
    }

    getListCategory() {
        interface ISubCat {
            name: string,
            display: boolean,
            value: IUISelectOption[],
        };
        interface ICategory {
            name: string,
            display: boolean,
            subcat:ISubCat[],
            valueWithoutSubcat: IUISelectOption[],
        };
        const categories = {
            cat: [] as ICategory[],
            valueWithoutCat: [] as IUISelectOption[],
        };

        this._options.forEach(option => {
            const { cat, subCat, obj } = this._splitValue(option.value);
            if (!subCat) {
                if (!cat) {
                    categories.valueWithoutCat.push(option);
                } else {
                    const indexCat = categories.cat.findIndex(c => c.name == cat);
                    if (indexCat == -1) {
                        categories.cat.push({ name: cat, subcat: [], valueWithoutSubcat: [], display: false });
                        categories.cat[categories.cat.length - 1].valueWithoutSubcat.push(option);
                    } else {
                        categories.cat[indexCat].valueWithoutSubcat.push(option);
                    }
                }
            } else {
                const indexCat = categories.cat.findIndex(c => c.name == cat);
                if (indexCat == -1) {
                    categories.cat.push({ name: cat, subcat: [], valueWithoutSubcat: [], display: false });
                    categories.cat[categories.cat.length - 1].subcat.push({ name: subCat, value: [option], display: false });
                } else {
                    const indexSubCat = categories.cat[indexCat].subcat.findIndex(sc => sc.name == subCat);
                    if (indexSubCat == -1) {
                        categories.cat[indexCat].subcat.push({ name: subCat, value: [option], display: false });
                    } else {
                        categories.cat[indexCat].subcat[indexSubCat].value.push(option);
                    }
                }
            }
        });

        categories.cat.forEach(cat => {
            cat.subcat.forEach(subcat => {
                subcat.value.forEach(value => {
                    if (value.display) {
                        cat.display = true;
                        subcat.display = true;
                    }
                });
            });
            cat.valueWithoutSubcat.forEach(value => {
                if (value.display) {
                    cat.display = true;
                }
            });
        })

        return {cat : Array.from(new Set([...categories.cat])), valueWithoutCat: Array.from(new Set([...categories.valueWithoutCat]))};
    }

}