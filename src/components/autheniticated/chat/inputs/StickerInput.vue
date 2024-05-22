<template>
    <VButtonIcon :text="$t('select_sticker')" icon="IconStickerEmoji">
        <v-card class="h-screen max-h-[361px] w-screen max-w-[278px]">
            <header class="flex h-[40px] items-center justify-center border-b">
                <h1>{{ $t('stickers') }}</h1>
            </header>
            <main>
                <v-container class="px-2 py-2">
                    <v-text-field
                        v-model="search"
                        :placeholder="$t('search_stickers')"
                        prepend-inner-icon="mdi-magnify"
                        outlined
                        density="compact"
                        variant="solo-filled"
                        class="w-full"
                    />
                </v-container>
            </main>
        </v-card>
    </VButtonIcon>
</template>

<script setup lang="ts">
import VButtonIcon from '@/components/layout/button/VButtonIcon.vue';
import { ref } from 'vue';

const search = ref('');
</script>
