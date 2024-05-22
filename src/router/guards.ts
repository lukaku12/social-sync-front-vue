import { getToken } from '@/config/axios/index.js';

export function isAuthenticated() {
    if (getToken()) {
        return '/';
    } else {
        return '/login';
    }
}
