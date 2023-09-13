import { H3Error } from 'h3';

const { user } = useAuth();
const notif = useNotif();

export default function () {

    const newGame = async (newGameName: string) => {
        try {
            const body = {
                user_id: user.value._id,
                // newGameName: newGameName
            };
            console.log(JSON.stringify(body));
            $fetch('/api/game/new', {
                method: 'POST',
                body: JSON.stringify(body),
            }).then((data) => {

                console.log(data);
            }).catch((err) => {
                if(err.response) {
                    console.log(err.response);
                    let errMessage = '';
                    if (err.response._data) {
                        if (err.response._data.message) errMessage = err.response._data.message;
                        else errMessage = err.response.statusText;
                    } else errMessage = err.response.statusText;
                    const newNotif = new Notif({
                        type: NotifType.warning,
                        message: `${errMessage}`,
                        title: `Error while creating a new game (${err.response.status})`,
                        timeout: 20 * 1000,
                        visibleInProd: false
                    });
                    notif.addNotif(newNotif);
                } else {
                    console.log(err);
                }
            });
        } catch (err) {
            const {statusMessage} = err;
            console.log(statusMessage);
        }
    };


    return { newGame };
}