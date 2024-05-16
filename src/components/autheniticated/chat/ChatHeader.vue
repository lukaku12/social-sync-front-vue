<template>
  <div>
    <v-card variant="flat" class="border-b" rounded="0">
      <v-container fluid class="flex w-full justify-between items-center py-0 px-2">
        <div class="flex items-center gap-3 p-3">
          <v-img
              class="rounded-full"
              :src="currentConversation?.image"
              alt="card"
              width="40"
              height="40"
          />
          <div>
            <h1 class="text-xl font-bold">{{ currentConversation?.name }} {{ currentConversation?.last_name}}</h1>
            <!--status -> green circle if active -> message if not active -> nothing if disabled-->
            <p class="text-sm">Active now</p>
          </div>
        </div>
        <div>
          <VButtonIcon text-location="bottom" :text="$t('start_a_call')" size="40" icon="IconPhone"/>
          <VButtonIcon text-location="bottom" :text="$t('start_a_video_call')" size="40" icon="IconVideo"/>
          <VButtonIcon text-location="bottom" :text="$t('info_about_chat')" size="40" icon="IconInfo"/>
        </div>

      </v-container>
    </v-card>
  </div>
</template>

<script setup lang="ts">
import VButtonIcon from "@/components/layout/button/VButtonIcon.vue";
import useConversationsStore from "@/store/module/conversations";
import {computed} from "vue";

const conversationsStore = useConversationsStore();

const currentConversation = computed(() => conversationsStore.currentConversation);


</script>
