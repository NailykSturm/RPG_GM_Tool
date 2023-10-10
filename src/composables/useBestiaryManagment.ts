import { ObjectId } from "mongoose";

import { IBestiary } from "~/types/IGame";
import { UserWithoutPassword } from "~/types/IUser";

export default function () {
    interface ILoaded { universe: string, owner: string | ObjectId }

    const fields = useState('fields', () => []);
    const creatures = useState('creatures', () => []);
    const loadedBestiary = useState('loadedBestiary', () => { return { universe: '', owner: '' } as ILoaded });

    const notif = useNotif();
    const { user } = useAuth();

    const fetchBestiary = async (universe: string) => {

        if (loadedBestiary.value.universe === universe && loadedBestiary.value.owner == user.value._id) return;

        try {
            const bestiary: IBestiary = await $fetch(`/api/bestiary/${universe}`, {
                method: 'GET',
            });

            fields.value = bestiary.fields;
            creatures.value = bestiary.creatures;
            loadedBestiary.value.universe = bestiary.universe;
            loadedBestiary.value.owner = user.value._id;
        } catch (err) {
            let errMessage = '';
            if (err.response._data) {
                if (err.response._data.message) errMessage = err.response._data.message;
                else errMessage = err.response.statusText;
            } else errMessage = err.response.statusText;
            notif.addNotif(new Notif({ type: NotifType.error, message: errMessage, title: `Error while refreshing the list of games` }));
            console.log(err);
        }
    }

    return { fields, creatures, fetchBestiary }
}