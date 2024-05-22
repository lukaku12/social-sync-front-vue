import {ref} from "vue";
import {defineStore} from "pinia";

type Messages = Record<string, Array<Array<Message>>>

const useMessagesStore = defineStore('messages', () => {

    const messages = ref<Messages>({});

    const addMessages = (key: string, value: Message[]) => {
        Object.assign(messages.value, {[key]: value})
    };

    const getCurrentMessages = (uuid: string) => {
        return messages.value[uuid];
    }

    const hasMessages = (uuid: string) => {
        return messages.value[uuid] !== undefined;
    }

    const addMessage = (uuid: string, message: Message) => {

        const currentMessages = messages.value[uuid];

        // conversation is empty
        if (currentMessages.length === 0) {
            currentMessages[0] = [message];
            console.log(message)
            return;
        }

        const lastMessageArray = currentMessages[currentMessages.length - 1];

        const lastMessageArrayLastMessage = lastMessageArray[lastMessageArray.length - 1];
        message.id = lastMessageArrayLastMessage.id+1;

        if (lastMessageArrayLastMessage.sender_id === message.sender_id) {
            lastMessageArray.push(message);
        } else {
            currentMessages.push([message]);
        }
        console.log(message)
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