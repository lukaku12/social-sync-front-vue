<template>
    <div
        ref="chatContentRef"
        class="max-h-[calc(100vh-196px)] !min-h-[calc(100vh-195px)] w-full overflow-y-scroll"
    >
        <div class="h-full w-full">
            <v-card class="!min-h-[calc(100vh-195px)] overflow-y-auto" rounded="0">
                <div class="px-4 pb-6 pt-2">
                    <ul class="flex-column flex h-full gap-y-1">
                        <v-container fluid class="flex h-full w-full flex-col px-0 py-0">
                            <li v-for="(message, i) in messages" :key="i" class="flex flex-col">
                                <template v-if="message">
                                    <div
                                        v-for="(messageSender, index) in message"
                                        :key="messageSender.id"
                                        class="relative flex w-full flex-col"
                                    >
                                        <v-img
                                            v-if="index === 0 && messageSender.sender_id !== userId"
                                            class="!absolute left-0 top-1 mr-auto rounded-full"
                                            :transition="false"
                                            :src="messageSender.sender.image"
                                            alt="card"
                                            width="40"
                                            height="40"
                                        />

                                        <v-tooltip
                                            open-delay="200"
                                            :text="convertedDate(messageSender.created_at)"
                                        >
                                            <template v-slot:activator="{ props: tooltip }">
                                                <v-card
                                                    :color="
                                                        messageSender.sender_id === userId
                                                            ? 'primary'
                                                            : 'white'
                                                    "
                                                    class="mt-3 max-w-[60%] !py-1.5 px-2"
                                                    rounded="xl"
                                                    :class="
                                                        messageSender.sender_id === userId
                                                            ? 'ml-auto'
                                                            : 'ml-12 mr-auto -translate-y-1'
                                                    "
                                                >
                                                    <div class="h-full w-full" v-bind="tooltip">
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
</template>

<script setup lang="ts">
import axios from '@/config/axios';
import { computed, onMounted, onUpdated, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import useMessagesStore from '@/store/module/messages';
import useUserStore from '@/store/module/user';

const messagesStore = useMessagesStore();
const route = useRoute();
const userStore = useUserStore();

const userId = computed(() => userStore?.user?.id);

const uuid = computed(() => route.params.uuid);
const messages = computed(() => messagesStore.getCurrentMessages(uuid.value as string));
const chatContentRef = ref<HTMLElement | undefined>(undefined);

const getMessages = () => {
    messagesStore.scrollToBottom(chatContentRef); // temp

    // only fetch messages if the conversation is not already in the store
    if (messagesStore.hasMessages(uuid.value as string)) return;

    axios
        .get(`conversations/${uuid.value}/messages`)
        .then(response => {
            messagesStore.addMessages(uuid.value as string, response.data);
            messagesStore.scrollToBottom(chatContentRef);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(() => {});
};

const convertedDate = (date: string) => new Date(date).toLocaleDateString();

onMounted(() => {
    getMessages();
    window.Echo.private(`conversations.${uuid.value}`).listen('GotMessage', (e: any) => {
        messagesStore.addMessage(uuid.value as string, e.message);
        messagesStore.scrollToBottom(chatContentRef);
    });
});

onUpdated(() => messagesStore.scrollToBottom(chatContentRef));
watch(route, () => getMessages());
</script>
