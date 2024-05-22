<template>
  <VButtonIcon :text="$t('select_gif')" icon="IconFileGifBox">

    <v-card class="w-screen h-screen max-w-[278px] max-h-[361px]">
      <header class="border-b flex justify-center items-center">
        <v-container class="px-2 py-2">
          <v-text-field
              v-model="search"
              :placeholder="$t('search')"
              prepend-inner-icon="mdi-magnify"
              outlined
              rounded
              hide-details="auto"
              density="compact"
              variant="solo-filled"
              class="w-full"
          />
        </v-container>
      </header>
      <main>
<!--       gifs /-->
      </main>

    </v-card>
  </VButtonIcon>
</template>

<script setup lang="ts">
import VButtonIcon from "@/components/layout/button/VButtonIcon.vue";
import {ref} from "vue";

const search = ref('');
</script>