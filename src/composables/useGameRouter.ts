import { Ref, ShallowRef } from "nuxt/dist/app/compat/capi"

import bestiaryVue from "~/components/pages/bestiary.vue";
import scriptVue from "~/components/pages/script.vue";
import notebookVue from "~/components/pages/notebook.vue";

enum listNameSubpages {'bestiary', 'notebook' , 'script'};
const displayNamesSubpages = ['Bestiary', 'Notebook' , 'Script'];

export default () => {
    const subpage: ShallowRef = shallowRef(null);
    const subpageName: Ref<listNameSubpages | undefined> = useState('name_subpage', () => undefined)
    const noSubpage: Ref<boolean> = useState('have-subpage', () => subpageName.value === undefined); 

    const switchSubpage = (new_subpage: listNameSubpages) => {
        switch (new_subpage) {
            case listNameSubpages.bestiary:
                subpage.value = bestiaryVue;
                break;
            case listNameSubpages.notebook:
                subpage.value = notebookVue;
                break;
            case listNameSubpages.script:
                subpage.value = scriptVue;
                break;
        }
    }

    const isSupbage = (try_subpage: listNameSubpages) => {
        switch (try_subpage) {
            case listNameSubpages.bestiary:
                return subpage.value == bestiaryVue;
            case listNameSubpages.notebook:
                return subpage.value == notebookVue;
            case listNameSubpages.script:
                return subpage.value == scriptVue;
        }
    }

    return { listNameSubpages ,subpage, noSubpage, switchSubpage , isSupbage};
}