import { Ref } from "nuxt/dist/app/compat/capi"

import { IGameInfo } from "~/types/IGame";
import { IAPIResponse } from "../types/IAPI";

export default function () {
    const { user } = useAuth();
    const notif = useNotif();

    const listGames: Ref<IGameInfo[]> = useState('games-list', () => []);

    const refreshListGames = async () => {
        try {
            const data: IGameInfo[] = await $fetch('/api/game/list', {
                method: 'GET',
            });
            listGames.value = data;
        } catch (error) {
            console.log(error);
        }
    }

    const newGame = async (newGame: IGameInfo) => {
        const gameName = newGame.name;
        const gameUniverse = newGame.universe;

        if (!gameName || !gameUniverse) {
            notif.addNotif(new Notif({ type: NotifType.error, message: 'Please fill all the fields', title: `Error while creating a new game` }));
            return;
        }

        try {
            const body = { user_id: user.value._id, gameName: gameName, gameUniverse: gameUniverse, };
            $fetch('/api/game/new', { method: 'POST', body: JSON.stringify(body), })
                .then(async (data: IAPIResponse) => {
                    await refreshListGames();
                    // console.log(data);

                    notif.addNotif(new Notif({ type: NotifType.success, message: data.message, title: data.statusMessage }));

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

    const updateGame = async (game: IGameInfo) => {
        const gameName = game.name;
        const gameUniverse = game.universe;
        const oldGameName = game.old_name;
        const oldGameUniverse = game.old_universe;

        if (!gameName || !gameUniverse) {
            notif.addNotif(new Notif({ type: NotifType.error, message: 'Please fill all the fields', title: `Error while creating a new game` }));
            return;
        }

        const body = { user_id: user.value._id, gameName: gameName, gameUniverse: gameUniverse, old_name: oldGameName, old_universe: oldGameUniverse,};
        $fetch('/api/game/update', { method: 'POST', body: JSON.stringify(body) })
            .then(async (data: IAPIResponse) => {
                await refreshListGames();
                // console.log(data);

                notif.addNotif(new Notif({ type: NotifType.success, message: data.message, title: data.statusMessage }));

            }).catch((err) => {
                if (err.response) {
                    // console.log(err.response);
                    let errMessage = '';
                    if (err.response._data) {
                        if (err.response._data.message) errMessage = err.response._data.message;
                        else errMessage = err.response.statusText;
                    } else errMessage = err.response.statusText;

                    notif.addNotif(new Notif({ type: NotifType.error, message: `${errMessage}`, title: `Error while updating a game (Error code : ${err.response.status})`, timeout: 20 * 1000, visibleInProd: false }));
                } else {

                    notif.addNotif(new Notif({ type: NotifType.error, title: `Error while updating a game`, timeout: 20 * 1000, visibleInProd: false }));
                    console.log(err);
                }
            });
    };

    const deleteGame = async (game: IGameInfo) => {
        const gameName = game.name;
        const gameUniverse = game.universe;

        if (!gameName || !gameUniverse) {
            notif.addNotif(new Notif({ type: NotifType.error, message: 'The game information is not complete', title: `Error while deleting a game` }));
            return;
        }

        const body = { user_id: user.value._id, gameName: gameName, gameUniverse: gameUniverse, };
        $fetch('/api/game/delete', { method: 'POST', body: JSON.stringify(body), })
            .then(async (data: IAPIResponse) => {
                await refreshListGames();
                notif.addNotif(new Notif({ type: NotifType.success, message: data.message, title: data.statusMessage }));
            }).catch((err) => {

                if (err.response) {
                    let errMessage = '';
                    if (err.response._data) {
                        if (err.response._data.message) errMessage = err.response._data.message;
                        else errMessage = err.response.statusText;
                    } else errMessage = err.response.statusText;

                    notif.addNotif(new Notif({ type: NotifType.error, message: `${errMessage}`, title: `Error while deleting a game (Error code : ${err.response.status})`, timeout: 20 * 1000, visibleInProd: false }));
                } else {
                    notif.addNotif(new Notif({ type: NotifType.error, title: `Error while deleting a game`, timeout: 20 * 1000, visibleInProd: false }));
                    console.log(err);
                }
            });
    };


    return { listGames, refreshListGames, newGame, updateGame, deleteGame };
}