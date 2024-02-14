import type { Ref } from "#imports";
import type { ShallowRef } from "vue";

import bestiaryVue from "../components/pages/bestiary.vue";
import equipementVue from "../components/pages/equipment.vue";
import scriptVue from "../components/pages/script.vue";
import notebookVue from "../components/pages/notebook.vue";

enum listNameSubpages {
    "bestiary",
    "equipement",
    "notebook",
    "script",
}
const displayNamesSubpages = ["Bestiary", "equipement", "Notebook", "Script"];

export default () => {
    const subpage: ShallowRef = shallowRef(null);
    const subpageName: Ref<listNameSubpages | undefined> = useState("name_subpage", () => undefined);
    const noSubpage: Ref<boolean> = useState("have-subpage", () => subpageName.value === undefined);

    const switchSubpage = (new_subpage: listNameSubpages) => {
        switch (new_subpage) {
            case listNameSubpages.bestiary:
                subpage.value = bestiaryVue;
                break;
            case listNameSubpages.equipement:
                subpage.value = equipementVue;
                break;
            case listNameSubpages.notebook:
                subpage.value = notebookVue;
                break;
            case listNameSubpages.script:
                subpage.value = scriptVue;
                break;
        }
    };

    const isSupbage = (try_subpage: listNameSubpages) => {
        switch (try_subpage) {
            case listNameSubpages.bestiary:
                return subpage.value == bestiaryVue;
            case listNameSubpages.equipement:
                return subpage.value == equipementVue;
            case listNameSubpages.notebook:
                return subpage.value == notebookVue;
            case listNameSubpages.script:
                return subpage.value == scriptVue;
        }
    };

    return { listNameSubpages, subpage, noSubpage, switchSubpage, isSupbage };
};
