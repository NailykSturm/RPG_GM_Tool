import { Ref } from "nuxt/dist/app/compat/capi";

import { IGame } from "~/types/IGame";

const emptyGame: IGame = { _id: '', name: '' };

export default () => {
    const toDeleteGame: Ref<IGame> = useState('id-game', () => emptyGame);

    return { toDeleteGame };
}