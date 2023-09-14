import { Ref } from "nuxt/dist/app/compat/capi";

export const NotifType = {
    // 'primary': 'primary',
    // 'secondary': 'secondary',
    'success': 'success',
    'info': 'info',
    'warning': 'warning',
    'error': 'error',
}

interface NotifConfig {
    type: string;
    message?: string;
    title: string;
    timeout?: number;
    visibleInProd?: boolean;
}

export class Notif {
    type: string;
    message: string;
    title: string;
    timeout: number;
    visibleInProd: boolean;
    display: boolean;

    constructor(config : NotifConfig){
        this.type = config.type;
        this.message = config.message || '' ;
        this.title = config.title;
        this.timeout = config.timeout || 5000;
        this.visibleInProd = config.visibleInProd || true;

        // console.log(`New notification created\ntitle: ${this.title}\nmessage: ${this.message}\ntype: ${this.type}\ntimeout: ${this.timeout}\nvisibleInProd: ${this.visibleInProd}`);
    }

    displayNotif() {
        this.display = true;
        return new Promise((resolve, reject) => {
            if ((process.env.NODE_ENV === 'production' && !this.visibleInProd)) {
                resolve('Notif not displayed in production');
            }
            console.log('Notif displayed');
            setTimeout(() => {
                this.display = false;
                console.log(`Notif removed`);
                resolve('Notification sucessfully displayed');
            }, this.timeout);
        });
    }
}

export default function () {
    const listNotifs: Ref<Notif[]> = useState('list-notifs', () => []);

    const addNotif = (notif: Notif) => {
        listNotifs.value.push(notif);
        notif.displayNotif().then(() => {
            listNotifs.value.splice(listNotifs.value.indexOf(notif), 1);
        });
    }

    return { Notif, listNotifs, addNotif };
}