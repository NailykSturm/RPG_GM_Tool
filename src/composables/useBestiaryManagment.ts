import type { ObjectId } from "mongoose";

import type { IBestiary, IBestiaryCreature, IBestiaryField } from "../types/Game/IGame";
import type { IUIBestiaryField } from "../types/User/IUI";
import { bestiaryFieldTypes } from "../types/Game/IGameImpl";

export default function () {
    interface ILoaded {
        universe: string;
        owner: string | ObjectId;
    }

    const fields: Ref<IBestiaryField[]> = useState("fields", () => []);
    const creatures: Ref<IBestiaryCreature[]> = useState("creatures", () => []);
    const loadedBestiary = useState("loadedBestiary", () => {
        return { universe: "", owner: "" } as ILoaded;
    });

    const notif = useNotif();
    const { user } = useAuth();

    const fetchBestiary = async (universe: string) => {
        try {
            const bestiary: IBestiary = await $fetch(`/api/bestiary/${universe}`, { method: "GET" });

            console.log(bestiary);
            fields.value = bestiary.fields;
            creatures.value = bestiary.creatures;
            loadedBestiary.value.universe = bestiary.universe;
            loadedBestiary.value.owner = user.value!._id;
        } catch (err: any) {
            let errMessage = "";
            if (err.response._data) {
                if (err.response._data.message) errMessage = err.response._data.message;
                else errMessage = err.response.statusText;
            } else errMessage = err.response.statusText;
            notif.addNotif(
                new Notif({ type: NotifType.error, message: errMessage, title: `Error while refreshing the list of games` })
            );
            console.log(err);
        }
    };

    const addFieldInBestiary = async (universe: string, newField: IUIBestiaryField) => {
        console.log(
            `addFieldInBestiary: ${universe} ${newField.field} in loadedBestiary: ${loadedBestiary.value.universe} by ${loadedBestiary.value.owner}`
        );

        if (!(loadedBestiary.value.universe === universe && loadedBestiary.value.owner === user.value!._id)) return;
        console.log(newField);

        const dataToSend: { universe: string; field: IBestiaryField } = {
            universe,
            field: {
                field: newField.field,
                type: newField.type,
                required: newField.required,
                value: undefined,
                options: undefined,
                min: undefined,
                max: undefined,
                step: undefined,
                maxLenght: undefined,
            },
        };

        switch (newField.type) {
            case bestiaryFieldTypes[0].field:
                dataToSend.field.maxLenght = newField.maxLenght;
                break;
            case bestiaryFieldTypes[1].field:
                dataToSend.field.options = newField.options!.getOptionsForAPI();
                break;
            case bestiaryFieldTypes[2].field:
                break;
            case bestiaryFieldTypes[3].field:
                dataToSend.field.min = newField.min;
                dataToSend.field.max = newField.max;
                dataToSend.field.step = newField.step;
                break;
            default:
                break;
        }

        try {
            const response = await $fetch(`/api/bestiary/${universe}/addField`, {
                method: "POST",
                body: JSON.stringify(dataToSend),
            });

            console.log(response);

            await fetchBestiary(universe);
        } catch (err: any) {
            let errMessage = "";
            if (err.response._data) {
                if (err.response._data.message) errMessage = err.response._data.message;
                else errMessage = err.response.statusText;
            } else errMessage = err.response.statusText;
            notif.addNotif(
                new Notif({ type: NotifType.error, message: errMessage, title: `Error while adding a field in bestiary` })
            );
            console.log(err);
        }
    };

    return { fields, creatures, fetchBestiary, addFieldInBestiary };
}
