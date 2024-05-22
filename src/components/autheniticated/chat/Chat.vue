<template>
    <section class="h-full w-full min-w-[400px] overflow-x-auto md:w-[calc(100%-360px)]">
        <main class="h-full w-full">
            <ChatHeader />
            <ChatContent />
            <ChatInputs />
        </main>
    </section>
</template>

<script setup lang="ts">
import ChatInputs from '@/components/autheniticated/chat/ChatInputs.vue';
import ChatHeader from '@/components/autheniticated/chat/ChatHeader.vue';
import ChatContent from '@/components/autheniticated/chat/ChatContent.vue';
</script>
