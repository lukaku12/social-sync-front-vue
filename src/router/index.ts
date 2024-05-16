import {createRouter, createWebHistory} from "vue-router";
import axiosInstance, {getToken} from "@/config/axios";
import useUserStore from "@/store/module/user";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import('@/views/authenticated/Home.vue'),
            name: 'home',
        },
        {
            path: '/login',
            component: () => import('@/views/not-authenticated/Login.vue'),
            name: 'login',
        },
        {
            path: '/register',
            component: () => import('@/views/not-authenticated/Register.vue'),
            name: 'register',
        },
        {
            path: '/forgot-password',
            component: () => import('@/views/not-authenticated/ForgotPassword.vue'),
            name: 'forgot-password',
        },
        {
            path: '/reset-password',
            component: () => import('@/views/not-authenticated/ResetPassword.vue'),
            name: 'reset-password',
        },

        {
            path: '/messages',
            component: () => import('@/views/authenticated/messages/NotFound.vue'),
            name: 'messages.not-found',
        },
        {
            path: '/messages/:uuid',
            component: () => import('@/views/authenticated/messages/Messages.vue'),
            name: 'messages.view',
        },

        {
            path: '/:pathMatch(.*)*',
            component: () => import('@/views/extras/NotFound.vue'),
            name: 'not-found',
        }
    ]
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register', '/forgot-password', '/reset-password'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');


    if (authRequired && !loggedIn) {
        return next('/login');
    }

    if (!authRequired && loggedIn) {
        return next('/');
    }

    if (from.name === 'login' && to.name === 'home') {
        axiosInstance.defaults.headers.Authorization = getToken();
        useUserStore().userIsLoggedIn = true;
    }

    next();
});

export default router;