import { Ref } from 'nuxt/dist/app/compat/capi';
import { IGameInfo } from '~/types/IGame';
import { emptyGame } from '~/types/IGameImpl';

export interface IModalParams {
    game: IGameInfo;
    title: string;
    confirmButtonText: string;
    displayFields: boolean;
    handleConfirm: Function;
}

export default function () {
    const modalParams: Ref<IModalParams> = useState('modal-params', () => ({
        game: emptyGame,
        title: '',
        confirmButtonText: '',
        displayFields: false,
        handleConfirm: () => {},
    }));

    function resetModalParams() {
        modalParams.value.game.name = '';
        modalParams.value.game.universe = emptyGame.universe;
    }

    return { modalParams, resetModalParams };
}
