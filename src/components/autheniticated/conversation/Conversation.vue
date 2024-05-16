<template>
  <section ref="conversationRef" class="relative">
    <v-hover>
      <template v-slot:default="{ isHovering, props }">
        <v-card
            flat
            v-bind="props"
            :color="active ? 'primary' : !active && isHovering ? 'rgba(63, 112, 207, 0.41)' : 'transparent'"
            rounded="md"
        >
          <router-link
              :to="{ name: 'messages.view', params: {uuid: conversation.uuid }}"
              class="flex gap-3 items-center conversation-item"
          >
            <div class="min-w-[56px] min-h-[56px]">
              <v-img rounded="circle" :src="conversation?.image" alt="conversation.name"/>
            </div>
            <div :class="{'font-bold': !conversation.isRead }" >
              <h1 class="overflow-x-hidden overflow-ellipsis whitespace-nowrap max-w-[250px]">
                {{ conversation.name }} {{ conversation.last_name }}
              </h1>
              <div class="flex text-sm items-end" v-if="conversation.last_message">
                <span class="overflow-x-hidden overflow-ellipsis whitespace-nowrap max-w-[150px]">
                  {{ conversation?.last_message }}
                </span>
                <span>&nbsp;•&nbsp;</span>
                <span :key="timeUpdateKey" :title="conversation.last_message_date"
                      class="font-normal overflow-x-hidden overflow-ellipsis whitespace-nowrap text-xs max-w-[80px]">
                  {{ dateToReadableText(conversation.last_message_date, locale) }}
                </span>
              </div>
            </div>
          </router-link>
        </v-card>
      </template>
    </v-hover>
    <div v-if="!conversation.isRead" class="hidden md:flex absolute right-1 top-1/2 -translate-y-1/2 pointer-events-none">
      <v-card rounded="circle" width="15" height="15" color="primary"/>
    </div>
  </section>
</template>

<script setup lang="ts">
import {computed, onUnmounted, ref} from "vue";
import dateToReadableText from "@/helpers/date-to-readable-text";
import i18n from "@/lang";

interface Conversation {
  id: number;
  uuid: string;
  name: string;
  last_name: string;
  image: string;
  last_message: string;
  last_message_date: string;
  isRead: boolean;
}

const {active, conversation} = defineProps<{
  conversation: Conversation;
  active: boolean;
}>();

const conversationRef = ref<HTMLElement | null>(null);

const locale = computed(() => i18n.global.locale.value);


const timeUpdateKey = ref(0);

const timeUpdateInterval = setInterval(() => timeUpdateKey.value += 1, 1000 * 60);
onUnmounted(() => clearInterval(timeUpdateInterval));

</script>

<style scoped>
.conversation-item {
  padding: 7px;
  border-radius: 5px;
  transition: background-color 0.2s;
}


</style>