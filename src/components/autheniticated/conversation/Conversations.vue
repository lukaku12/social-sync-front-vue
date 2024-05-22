<template>
    <v-card
        rounded="0"
        border-right="small"
        class="h-full w-[100px] min-w-[100px] !border-r md:min-w-[360px] md:max-w-[360px]"
    >
        <v-container class="px-3">
            <div class="flex flex-col items-center justify-between gap-y-2 md:flex-row">
                <div>
                    <h1 class="whitespace-break-spaces text-xl md:break-normal md:text-3xl">
                        {{ $t('conversations') }}
                    </h1>
                </div>
                <div class="flex flex-col gap-2 md:flex-row">
                    <v-btn size="small" :icon="IconHorizontalThreeDots" variant="outlined"></v-btn>
                    <v-btn size="small" :icon="IconPencilInBox" variant="outlined"></v-btn>
                </div>
            </div>
            <v-text-field
                class="mt-5"
                rounded
                hide-details="auto"
                v-model="search"
                density="compact"
                :placeholder="$t('search') + '...'"
                variant="outlined"
                outlined
                prepend-inner-icon="mdi-magnify"
            />
        </v-container>

        <v-skeleton-loader
            v-if="requestState.dataIsEmptyBeforeFetch()"
            :loading="true"
            height="50"
        />
        <ul
            v-if="requestState.dataIsNotEmptyAfterFetch()"
            class="flex-column flex max-h-[calc(100vh-200px)] gap-y-1 overflow-y-auto pb-4 md:pb-0"
        >
            <v-container class="py-0">
                <li v-for="conversation in conversations">
                    <Conversation
                        :key="conversation.id"
                        :conversation="conversation"
                        :active="currentConversation?.id === conversation.id"
                    />
                </li>
            </v-container>
        </ul>
        <v-card v-if="requestState.dataIsEmptyAfterFetch()" flat>
            <v-container class="text-center">
                <div>
                    <span>{{ $t('no_conversations_were_found') }}</span>
                </div>
                <div>
                    <span>{{ $t('you_can_search_and_find_new_conversations') }}</span>
                </div>
            </v-container>
        </v-card>
    </v-card>
</template>

<script setup lang="ts">
import IconHorizontalThreeDots from '@/components/icons/IconHorizontalThreeDots.vue';
import IconPencilInBox from '@/components/icons/IconPencilInBox.vue';
import Conversation from '@/components/autheniticated/conversation/Conversation.vue';
import { computed, onMounted, ref } from 'vue';
import useConversationStore from '@/store/module/conversations';
import useRequestState from '@/composables/request-state';

const conversationStore = useConversationStore();

const isFetched = ref(false);

const conversations = computed(() => conversationStore.conversations);
const currentConversation = computed(() => conversationStore.currentConversation);

const requestState = computed(() => useRequestState(isFetched, conversations.value));

onMounted(
    () => conversations.value.length === 0 && conversationStore.fetchConversations(isFetched),
);

const search = ref('');
</script>
