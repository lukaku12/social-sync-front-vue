<template>
    <p class="text-gray-500 mt-10 text-center text-sm">
        {{ title }}
        <router-link
            :to="{ name: linkToName }"
            class="text-indigo-600 hover:text-indigo-500 font-semibold leading-6"
        >
            {{ linkTitle }}
        </router-link>
    </p>
</template>

<script setup lang="ts">
defineProps({
    title: {
        type: String,
        required: true,
    },
    linkTitle: {
        type: String,
        required: true,
    },
    linkToName: {
        type: String,
        required: true,
    },
});
</script>
