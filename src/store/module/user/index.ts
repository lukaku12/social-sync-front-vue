import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import axios from '@/config/axios';
import { useRouter } from 'vue-router';

const useUserStore = defineStore('user', () => {
    const router = useRouter();

    const user = ref<User | null>(null);
    const userIsLoggedIn = ref(!!localStorage.getItem('token'));

    const isFetchingUser = ref(false);
    const isLoggingOut = ref(false);

    async function fetchUser() {
        console.log('fetching user');
        isFetchingUser.value = true;
        axios
            .get('user')
            .then(res => {
                user.value = res.data;
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                isFetchingUser.value = false;
            });
    }

    async function logout(dialogIsOpen?: Ref<boolean>) {
        isLoggingOut.value = true;
        axios
            .post('logout')
            .then(() => {
                localStorage.removeItem('token');
                if (dialogIsOpen) dialogIsOpen.value = false;
                userIsLoggedIn.value = false;
                isLoggingOut.value = false;
                router.replace({ name: 'login' });
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                isLoggingOut.value = false;
            });
    }

    return {
        user,
        fetchUser,
        logout,
        isFetchingUser,
        isLoggingOut,
        userIsLoggedIn,
    };
});

export default useUserStore;
