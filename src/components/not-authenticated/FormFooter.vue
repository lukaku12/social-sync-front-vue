<template>
  <p class="mt-10 text-center text-sm text-gray-500">
    {{ title }}
    <router-link :to="{name: linkToName}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
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
