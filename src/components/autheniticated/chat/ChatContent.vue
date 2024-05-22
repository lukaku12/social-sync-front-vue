<template>
  <div ref="chatContentRef"
       class="w-full overflow-y-scroll !min-h-[calc(100vh-195px)] max-h-[calc(100vh-196px)]">
    <div class="w-full h-full">
      <v-card class="!min-h-[calc(100vh-195px)] overflow-y-auto" rounded="0">

        <div class="px-4 pt-2 pb-6">
          <ul class="flex flex-column gap-y-1 h-full">
            <v-container fluid class="py-0 flex flex-col w-full h-full px-0">

              <li
                  v-for="(message, i) in messages"
                  :key="i"
                  class="flex flex-col"
              >

                <template v-if="message">
                  <div
                      v-for="(messageSender, index) in message"
                      :key="messageSender.id"
                      class="flex flex-col w-full relative"
                  >
                    <v-img
                        v-if="index === 0 && messageSender.sender_id !== userId"
                        class="rounded-full mr-auto !absolute left-0 top-1"
                        :transition="false"
                        :src="messageSender.sender.image"
                        alt="card"
                        width="40"
                        height="40"
                    />

                    <v-tooltip open-delay="200" :text="convertedDate(messageSender.created_at)">
                      <template v-slot:activator="{ props: tooltip }">

                        <v-card
                            :color="messageSender.sender_id === userId ? 'primary' : 'white'"
                            class="mt-3 px-2 !py-1.5 max-w-[60%]"
                            rounded="xl"
                            :class="messageSender.sender_id === userId ? 'ml-auto' : 'mr-auto ml-12 -translate-y-1' "
                        >
                          <div class="w-full h-full" v-bind="tooltip">
                          <span>
                            {{ messageSender.content }}
                          </span>
                          </div>
                        </v-card>
                      </template>
                    </v-tooltip>

                  </div>
                </template>

              </li>
            </v-container>
          </ul>
        </div>

      </v-card>
    </div>
  </div>
  {{}}
</template>

<script setup lang="ts">
import axios from "@/config/axios";
import {computed, onMounted, onUpdated, ref, watch} from "vue";
import {useRoute} from "vue-router";
import useMessagesStore from "@/store/module/messages";
import useUserStore from "@/store/module/user";

const messagesStore = useMessagesStore();
const route = useRoute();
const userStore = useUserStore();

const userId = computed(() => userStore?.user?.id);

const uuid = computed(() => route.params.uuid);
const messages = computed(() => messagesStore.getCurrentMessages(uuid.value as string));
const chatContentRef = ref<HTMLElement | null>(null);

const scrollToBottom = () => {
  setTimeout(() => {
    if (!chatContentRef.value) return;
    chatContentRef.value.scrollTop = chatContentRef.value.scrollHeight;
  })
}

const getMessages = () => {

  scrollToBottom(); // temp

  // only fetch messages if the conversation is not already in the store
  if (messagesStore.hasMessages(uuid.value as string)) return;

  axios
      .get(`conversations/${uuid.value}/messages`)
      .then((response) => {
        messagesStore.addMessages(uuid.value as string, response.data);
        scrollToBottom();
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
      });
};

const convertedDate = (date: string) => new Date(date).toLocaleDateString();

onMounted(() => {
  getMessages();
  window.Echo.private(`conversations.${uuid.value}`)
      .listen(
          'GotMessage',
          (e: any) => {
            messagesStore.addMessage(uuid.value as string, e.message);
            scrollToBottom();
          });
});

onUpdated(() => scrollToBottom());
watch(route, () => getMessages());

// const conversationsStore = useConversationsStore();
// const currentConversation = computed(() => conversationsStore.currentConversation);

</script>