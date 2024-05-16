import {ref} from "vue";
import {defineStore} from "pinia";

const useMessagesStore = defineStore('messages', () => {

    const messages = ref([]);

    const addMessages = (key: string, value: any) => {
        Object.assign(messages.value, {[key]: value})
    };

    const getCurrentMessages = (uuid: string) => {
        return messages.value[uuid];
    }

    const hasMessages = (uuid: string) => {
        return messages.value[uuid] !== undefined;
    }

    const addMessage = (uuid: string, message: object) => {

        const currentMessages = messages.value[uuid];

        // conversation is empty
        if (currentMessages.length === 0) {
            currentMessages[0] = [];
            currentMessages[0].push(message);
            return;
        }


        const lastMessageArray = currentMessages[currentMessages.length - 1];

        const lastMessageArrayLastMessage = lastMessageArray[lastMessageArray.length - 1];

        if (lastMessageArrayLastMessage.sender_id === message.sender_id) {
            lastMessageArray.push(message);
        } else {
            currentMessages.push([message]);
        }
    }

    return {
        messages,
        addMessages,
        getCurrentMessages,
        hasMessages,
        addMessage
    };
});


export default useMessagesStore;