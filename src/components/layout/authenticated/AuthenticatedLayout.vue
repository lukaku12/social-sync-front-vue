<template>
  <main class="h-screen w-full flex">
    <Conversations/>
    <slot/>
  </main>
</template>

<script setup lang="ts">
import Conversations from "@/components/autheniticated/conversation/Conversations.vue";
</script>
