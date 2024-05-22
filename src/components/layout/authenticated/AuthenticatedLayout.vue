<template>
    <main class="flex h-screen w-full">
        <Conversations />
        <slot />
    </main>
</template>

<script setup lang="ts">
import Conversations from '@/components/autheniticated/conversation/Conversations.vue';
</script>
