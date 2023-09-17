import { Ref } from "nuxt/dist/app/compat/capi"
import { IGameInfo, emptyGame } from "~/types/IGame";

export interface IModalParams {
    game: IGameInfo,
    title: string,
    confirmButtonText: string,
    displayFields: boolean,
    handleConfirm: Function,
}

export default function () {
    const modalParams: Ref<IModalParams> = useState('modal-params', () => ({
        game: emptyGame,
        title: '',
        confirmButtonText: '',
        displayFields: false,
        handleConfirm: () => { },
    }));

    function resetModalParams() {
        modalParams.value.game.name = '';
        modalParams.value.game.universe = '';
    }

    return { modalParams, resetModalParams }
}