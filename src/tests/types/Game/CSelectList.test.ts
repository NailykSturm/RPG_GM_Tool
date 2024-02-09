import { beforeAll, beforeEach, describe, expect, test } from "vitest";

import { CSelectList, CSelectListElement } from "../../../types/Game/CSelectList";

describe("add somme options", () => {
    let game: CSelectList;
    beforeEach(() => {
        game = new CSelectList();
    });

    test("The list option is defined and empty", () => {
        expect(game).toBeDefined();
        expect(game).toBeInstanceOf(CSelectList);
        expect(game.size).toEqual(0);
    });

    const opt1 = "option1";
    const opt2 = "option2";
    const opt3 = "option3";
    test("Adding one option, and the list increase", () => {
        game.addOption(opt1);
        expect(game.size).toEqual(1);
    });
    test("Adding some more options", () => {
        game.addOption(opt1);
        game.addOption(opt2);
        game.addOption(opt3);
        expect(game.getOptions().length).toEqual(3);
    });

    test("Add already exist options", () => {
        game.addOption(opt1);
        game.addOption(opt1);
        expect(game.size).toEqual(1);
    });
});

describe("remove somme options", () => {
    let game: CSelectList;
    const opt1 = "option1";
    const opt2 = "option2";
    const opt3 = "option3";
    test("Remove one option", () => {
        game = new CSelectList();
        game.addOption(opt1);
        game.addOption(opt2);
        game.addOption(opt3);
        expect(game.size).toEqual(3);

        game.removeOption(opt1);
        expect(game.size).toEqual(2);
        expect(game.getOption(opt1)).toEqual(null);
    });
});

describe("getting an option", () => {
    let game: CSelectList;
    const opt1 = "option1";
    const opt2 = "cat/option2";
    beforeEach(() => {
        game = new CSelectList();
        game.addOption(opt1);
        game.addOption(opt2);
    });
    test("get all options", () => {
        const options = game.getOptions();
        expect(options.length).toEqual(2);
        expect(options[0].display).toBeDefined();
        expect(options[0].value).toBeDefined();
    });

    test("get options for API", () => {
        const options = game.getOptionsForAPI();
        expect(options[0]).toBeInstanceOf(CSelectListElement);
    });

    test("get an option", () => {
        const opt = game.getOption(opt1);
        expect(opt!.value.value).toEqual(opt1);
    });
    test("get a null option", () => {
        const notExist = "not exist";
        expect(game.getCategory(notExist)).toEqual(null);
        expect(game.getSubCategory(notExist)).toEqual(null);
        expect(game.getElement(notExist)).toEqual(null);
    });
});

describe("edit the option", () => {
    test("change the value of the option", () => {
        const opt = new CSelectListElement("option");
        expect(opt.value).toEqual("option");
        opt.setValue("value");
        expect(opt.value).toEqual("value");
    });
});

describe("parse options", () => {
    // Basic cases
    const opt1 = new CSelectListElement("option1");
    const opt2 = new CSelectListElement("cat/option2");
    const opt3 = new CSelectListElement("cat/subcat/option3");

    // User error case
    const opt4 = new CSelectListElement("subcat/option4");
    const opt5 = new CSelectListElement("cat/subcat/subsubcat/option5");

    test("empty option", () => {
        const opt = new CSelectListElement("");
        expect(opt.depth).toEqual(0);
        expect(opt.category).toEqual(undefined);
        expect(opt.subCategory).toEqual(undefined);
        expect(opt.element).toEqual(undefined);
    });

    test("option with one level", () => {
        expect(opt1.depth).toEqual(1);
        expect(opt1.category).toEqual(undefined);
        expect(opt1.subCategory).toEqual(undefined);
        expect(opt1.element).toEqual(opt1.value);
    });
    test("option with two levels", () => {
        expect(opt2.depth).toEqual(2);
        expect(opt2.category).toEqual(opt2.value.split("/")[0]);
        expect(opt2.subCategory).toEqual(undefined);
        expect(opt2.element).toEqual(opt2.value.split("/")[1]);
    });
    test("option with two levels but from the list", () => {
        const game = new CSelectList();
        game.addOption(opt2.value);
        expect(opt2.category).toEqual(game.getCategory(opt2.value));
        expect(opt2.subCategory).toEqual(game.getSubCategory(opt2.value));
        expect(opt2.element).toEqual(game.getElement(opt2.value));
    });
    test("option with three levels", () => {
        expect(opt3.depth).toEqual(3);
        expect(opt3.category).toEqual(opt3.value.split("/")[0]);
        expect(opt3.subCategory).toEqual(opt3.value.split("/")[1]);
        expect(opt3.element).toEqual(opt3.value.split("/")[2]);

        const { cat, subCat, elt } = opt3.parsedElt;
        expect(cat).toEqual(opt3.category);
        expect(subCat).toEqual(opt3.subCategory);
        expect(elt).toEqual(opt3.element);
    });

    test("option with two levels but subcat/elt", () => {
        expect(opt4.depth).toEqual(2);
        expect(opt4.category).toEqual(opt4.value.split("/")[0]);
        expect(opt4.subCategory).toEqual(undefined);
        expect(opt4.element).toEqual(opt4.value.split("/")[1]);
    });

    test("option with too much depth", () => {
        let opt5_splited = opt5.value.split("/");
        expect(opt5.depth).toBeLessThan(opt5_splited.length);
        let opt5_cat = opt5_splited.shift();
        expect(opt5.category).toEqual(opt5_cat);
        let opt5_subCat = opt5_splited.shift();
        expect(opt5.subCategory).toEqual(opt5_subCat);
        let opt5_elt = opt5_splited.join("/");
        expect(opt5.element).toEqual(opt5_elt);
    });
});

describe("display control tests", () => {
    let game: CSelectList;

    beforeEach(() => {
        game = new CSelectList();
        game.addOption("random1");
        game.addOption("random2");
        game.addOption("random3");
        game.addOption("random4");
        game.addOption("cat1/element");
        game.addOption("cat2/element");
        game.addOption("cat3/element");
        game.addOption("default/test1");
        game.addOption("default/test2");
        game.addOption("default/test3");
        game.addOption("default/test4");
        game.addOption("cat2/subcat1/element");
        game.addOption("cat2/subcat2/element");
        game.addOption("cat2/subcat3/element");
        game.addOption("arme/melee/melee1");
        game.addOption("arme/melee/melee2");
        game.addOption("arme/melee/melee3");
        game.addOption("arme/melee/melee4");
    });

    function allDisplayed(): boolean {
        let allDisplayed = true;
        game.getOptions().forEach((elt) => {
            if (!elt.display) allDisplayed = false;
        });
        return allDisplayed;
    }
    function countDisplayed(): number {
        let count = 0;
        game.getOptions().forEach((element) => {
            count += element.display ? 1 : 0;
        });
        return count;
    }

    test("all displayed by default", () => {
        expect(allDisplayed()).toEqual(true);
        expect(countDisplayed()).toEqual(game.getOptions().length);
    });

    test("display all values after reset", () => {
        game.getOptions().forEach((opt) => {
            opt.display = false;
        });
        expect(allDisplayed()).toEqual(false);
        expect(countDisplayed()).toEqual(0);
        game.resetDisplay();
        expect(allDisplayed()).toEqual(true);
        expect(countDisplayed()).toEqual(game.getOptions().length);
    });

    test("include option", () => {
        game.includeOption("1");
        const listOfDisplayed: string[] = [];
        game.getOptions().forEach((opt) => {
            expect(opt.display).toEqual(opt.value.value.includes("1"));
            if (opt.display) listOfDisplayed.push(opt.value.value);
        });
        const listIncludes1 = ["random1", "cat1/element", "default/test1", "cat2/subcat1/element", "arme/melee/melee1"];
        expect(listOfDisplayed.length).toEqual(listIncludes1.length);
        listOfDisplayed.sort();
        listIncludes1.sort();

        listOfDisplayed.forEach((elt, index) => {
            expect(listIncludes1[index]).toEqual(elt);
        });
    });
});

describe("get the list of categories and subcategories", () => {
    let game: CSelectList;

    beforeEach(() => {
        game = new CSelectList();
        // game.addOption("cat2/subcat1/element");
        // game.addOption("cat2/subcat2/element");
        // game.addOption("cat2/subcat3/element");
        // game.addOption("arme/melee/melee1");
        // game.addOption("arme/melee/melee2");
        // game.addOption("arme/melee/melee3");
        // game.addOption("arme/melee/melee4");
    });

    test("get list of category with one depth element", () => {
        game.addOption("opt1");
        game.addOption("opt2");

        const cats = game.listCategories;
        expect(cats.cat.length).toEqual(0);
        expect(cats.valueWithoutCat.length).toEqual(2);
    });
    test("get list of category with two depth element", () => {
        game.addOption("cat1/element");
        game.addOption("cat2/element");
        game.addOption("cat3/element");
        game.addOption("default/test1");
        game.addOption("default/test2");
        game.addOption("default/test3");
        game.addOption("default/test4");

        const cats = game.listCategories;
        const catsLbls = ["cat1", "cat2", "cat3", "default"];
        cats.cat.sort();
        catsLbls.sort();

        expect(cats.cat.length).toEqual(catsLbls.length);
        expect(cats.valueWithoutCat.length).toEqual(0);
        cats.cat.forEach((elt, idx) => {
            expect(catsLbls[idx]).toEqual(elt.name);
        });
    });
    test("get list of category with three depth element", () => {
        game.addOption("cat1/subcat1/element");
        game.addOption("cat1/subcat2/element");
        game.addOption("cat1/subcat3/element");
        game.addOption("cat2/subcat1/element1");
        game.addOption("cat2/subcat1/element2");
        game.addOption("cat2/subcat1/element3");

        const cats = game.listCategories;
        const catsLbls = ["cat1", "cat2"];
        cats.cat.sort();
        catsLbls.sort();

        expect(cats.cat.length).toEqual(catsLbls.length);
        expect(cats.valueWithoutCat.length).toEqual(0);
        cats.cat.forEach((elt, idx) => {
            expect(catsLbls[idx]).toEqual(elt.name);
        });

        expect(cats.cat[0].subcats.length).toEqual(3);
        expect(cats.cat[1].subcats.length).toEqual(1);
        expect(cats.cat[0].subcats[0].values.length).toEqual(1);
        expect(cats.cat[1].subcats[0].values.length).toEqual(3);
    });
});
