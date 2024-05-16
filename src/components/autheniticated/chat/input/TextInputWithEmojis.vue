<template>
  <div class="w-full flex h-full items-center gap-x-3">
    <v-text-field
        class="w-full myInput"
        rounded
        hide-details="auto"
        color="primary"
        v-model="message"
        density="compact"
        :placeholder="$t('aa')"
        variant="solo-filled"
        outlined
    >
      <div class="absolute right-2">
        <VButtonIcon :text="$t('select_emoji')" icon="IconEmoticonHappy" size="30">
          <v-card class="w-screen h-screen max-w-[278px] max-h-[361px]">
            <v-container class="pa-2">
              <header>
                <v-text-field
                    v-model="search"
                    :placeholder="$t('search_emojis')"
                    prepend-inner-icon="mdi-magnify"
                    outlined
                    rounded
                    hide-details="auto"
                    density="compact"
                    variant="solo-filled"
                    class="w-full"
                />
              </header>
              <main>
                <v-container class="pa-2">
                  <h1 class="text-xs text-grey-darken-1">სიცილაკები და ადამიანები</h1>
                </v-container>
              </main>
            </v-container>
          </v-card>
        </VButtonIcon>
      </div>
    </v-text-field>
  </div>
</template>

<script setup lang="ts">
import VButtonIcon from "@/components/layout/button/VButtonIcon.vue";
import {ref} from "vue";

const message = defineModel();

const search = ref('');

</script>
