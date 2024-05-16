import Echo from 'laravel-echo';

import Pusher from 'pusher-js';
import {getToken} from "@/config/axios";

declare global {
    interface Window {
        Echo: Echo;
        Pusher: typeof Pusher;
    }
}


window.Pusher = Pusher;

window.Echo = new Echo({
    broadcaster: 'reverb',
    key: import.meta.env.VITE_REVERB_APP_KEY,
    wsHost: import.meta.env.VITE_REVERB_HOST,
    wsPort: import.meta.env.VITE_REVERB_PORT,
    wssPort: import.meta.env.VITE_REVERB_PORT,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? 'https') === 'https',
    enabledTransports: ['ws', 'wss'],
    auth: {
        headers: {
            Authorization: getToken(),
        },
    },
    authEndpoint: import.meta.env.VITE_API_BASE_URL + 'broadcasting/auth',
});