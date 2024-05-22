<template>
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <div class="flex-column flex w-full items-center justify-center">
            <v-icon size="60" :icon="IconLogo" alt="SocialSync" />
            <h2
                class="text-gray-900 my-5 text-center text-2xl font-bold leading-9 tracking-tight"
                v-html="title"
            ></h2>
        </div>
    </div>
</template>

<script setup lang="ts">
import IconLogo from '@/components/icons/IconLogo.vue';

defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
