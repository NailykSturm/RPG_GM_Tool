import { Ref } from "nuxt/dist/app/compat/capi"

import { IGameInfo } from "~/types/IGame";

export default function () {
    const { user } = useAuth();
    const notif = useNotif();

    const listGames: Ref<IGameInfo[]> = useState('games-list', () => []);

    const refreshListGames = async () => {
        try {
            const data: IGameInfo[] = await $fetch('/api/game/list', {
                method: 'GET',
                // body: JSON.stringify({ id_user: user.value }),
            });
            listGames.value = data;
        } catch (error) {
            console.log(error);
        }
    }

    const newGame = async (newGame: IGameInfo) => {
        const newGameName = newGame.name;
        const newGameUniverse = newGame.universe;

        if (!newGameName || !newGameUniverse) {
            notif.addNotif(new Notif({ type: NotifType.error, message: 'Please fill all the fields', title: `Error while creating a new game` }));
            return;
        }

        try {
            const body = { user_id: user.value._id, newGameName: newGameName, newGameUniverse: newGameUniverse, };
            $fetch('/api/game/new', { method: 'POST', body: JSON.stringify(body), })
                .then(async (data: string) => {
                    await refreshListGames();

                    notif.addNotif(new Notif({ type: NotifType.success, message: data, title: `New game added` }));
                    console.log(data);

                }).catch((err) => {
                    if (err.response) {
                        // console.log(err.response);
                        let errMessage = '';
                        if (err.response._data) {
                            if (err.response._data.message) errMessage = err.response._data.message;
                            else errMessage = err.response.statusText;
                        } else errMessage = err.response.statusText;

                        notif.addNotif(new Notif({ type: NotifType.error, message: `${errMessage}`, title: `Error while creating a new game (Error code : ${err.response.status})`, timeout: 20 * 1000, visibleInProd: false }));
                    } else {

                        notif.addNotif(new Notif({ type: NotifType.error, title: `Error while creating a new game`, timeout: 20 * 1000, visibleInProd: false }));
                        console.log(err);
                    }
                });
        } catch (err) {
            const { statusMessage } = err;
            console.log(statusMessage);
        }
    };


    return { listGames, refreshListGames, newGame };
}