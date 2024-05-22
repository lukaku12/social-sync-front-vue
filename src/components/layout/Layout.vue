<template>
    <v-app class="overflow-y-hidden">
        <BaseHeader :user-store="userStore" />

        <AuthenticatedLayout v-if="userStore.userIsLoggedIn">
            <slot />
        </AuthenticatedLayout>

        <NotAuthenticatedLayout v-else>
            <slot />
        </NotAuthenticatedLayout>
    </v-app>
</template>

<script setup lang="ts">
import NotAuthenticatedLayout from '@/components/layout/not-authenticated/NotAuthenticatedLayout.vue';
import AuthenticatedLayout from '@/components/layout/authenticated/AuthenticatedLayout.vue';
import BaseHeader from '@/components/BaseHeader.vue';
import useUserStore from '@/store/module/user';
import { onMounted } from 'vue';

const userStore = useUserStore();

onMounted(() => !userStore.user && userStore.userIsLoggedIn && userStore.fetchUser());
</script>
