import {defineStore} from 'pinia'
import {onMounted, Ref, ref, watch} from "vue";
import {useRoute} from "vue-router";
import axios from "@/config/axios";

const useConversationsStore = defineStore('conversations', () => {
    const route = useRoute();
    const conversations = ref<Conversation[]>([]);
    const currentConversation = ref<Conversation | null>(null);
    const currentConversationUuid = ref<string | null>(null);

    const fetchConversations = (setIsFetched: (value: boolean) => Ref<any>) => {
        // fetch conversations from API
        setIsFetched(false);
        axios
            .get('conversations')
            .then(response => {
                conversations.value = response.data;
                if (currentConversationUuid.value) {
                    setCurrentConversation(currentConversationUuid.value)
                }
            })
            .catch((error) => {
                console.log(error.response);
            })
            .finally(() => {
                setIsFetched(true);
            })
    }

    const setConversationIsRead = (uuid: string) => {
        if (!conversations.value.length) return;
        const index = conversations.value.findIndex(conversation => conversation.uuid === uuid);
        conversations.value[index].isRead = true;
    }

    const setCurrentConversation = (uuid: string) => {
        currentConversation.value = conversations.value.find(conversation => conversation.uuid === uuid) || null;
        setConversationIsRead(uuid);
    }

    const removeActiveConversation = () => {
        currentConversation.value = null;
    }

    onMounted(() => {
        if (route.name === 'messages.view' && route.params['uuid']) {
            currentConversationUuid.value = route.params['uuid'] as string;
            setCurrentConversation(route.params['uuid'] as string);
        }
        if (route.name !== 'messages.view') {
            removeActiveConversation();
        }
    });

    watch(() => route.path, () => {
        if (route.name === 'messages.view') {
            currentConversationUuid.value = route.params['uuid'] as string;
            setCurrentConversation(route.params['uuid'] as string);
        }
        if (route.name !== 'messages.view') {
            removeActiveConversation();
        }
    });


    return {
        conversations,
        currentConversation,
        setCurrentConversation,
        fetchConversations,
    }
})

export default useConversationsStore;