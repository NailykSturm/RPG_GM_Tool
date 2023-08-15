import { Ref } from "nuxt/dist/app/compat/capi"

import { IGame } from "../types/IGame";
import auth from "./useAuth";

export default () => {
    const subpage: Ref<string> = useState('game-subpage', () => 'bestiary');
    const listGames: Ref<IGame[]> = useState('games-list', () => []);

    const refreshListGames = async () => {
        try {
            const data: IGame[] = await $fetch('/api/listGame', {
                method: 'POST',
                body: JSON.stringify({ user: auth().user }),
            });
            listGames.value = data;
        } catch (error) {
            console.log(error);
        }
    }

    return { subpage, listGames, refreshListGames };
}