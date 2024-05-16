import {token} from "@/config/axios/index.js";

export function isAuthenticated() {
    if (token) {
        return "/";
    } else {
        return "/login";
    }
}