<template>
    <VButtonIcon :close-on-click="true" :text="$t('open_additional_actions')" icon="IconPlusFilled">
        <v-card>
            <v-container class="px-1 py-1">
                <v-btn :prepend-icon="IconMicrophone" class="!capitalize">
                    {{ $t('send_voice_message') }}
                </v-btn>
            </v-container>
        </v-card>
    </VButtonIcon>
</template>

<script setup lang="ts">
import IconMicrophone from '@/components/icons/IconMicrophone.vue';
import VButtonIcon from '@/components/layout/button/VButtonIcon.vue';
</script>
