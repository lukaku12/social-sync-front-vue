<template>
  <v-form @submit.prevent="submitForm">
    <v-card variant="flat" rounded="0" class="w-full ">
      <div class="flex items-center py-2 gap-x-2 px-3">
        <AdditionalActions/>
        <FileInput :files="files" @set-file-value="(data) => files = data"/>
        <StickerInput/>
        <GifInput/>
        <TextInputWithEmojis v-model="message"/>
        <VButtonIcon
            type="submit"
            :key="messageCanBeSent.toString()"
            :text="messageCanBeSent ? $t('press_enter_to_send_message') : $t('send')"
            :icon="messageCanBeSent ? 'IconSend' : 'IconThumbsUp'"
        />
      </div>
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import AdditionalActions from "@/components/autheniticated/chat/inputs/AdditionalActions.vue";
import FileInput from "@/components/autheniticated/chat/inputs/FileInput.vue";
import StickerInput from "@/components/autheniticated/chat/inputs/StickerInput.vue";
import GifInput from "@/components/autheniticated/chat/inputs/GifInput.vue";
import TextInputWithEmojis from "@/components/autheniticated/chat/inputs/TextInputWithEmojis.vue";
import {computed, ref} from "vue";
import VButtonIcon from "@/components/layout/button/VButtonIcon.vue";
import {useRoute} from "vue-router";
import useMessagesStore from "@/store/module/messages";
import useUserStore from "@/store/module/user";
import axios from "@/config/axios";

const message = ref('');
const files = ref(undefined);

const router = useRoute();
const userStore = useUserStore();
const uuid = computed(() => router.params.uuid);
const messageStore = useMessagesStore();

const submitForm = () => {
      messageStore.addMessage(uuid.value as string, {
        id: 0,
        conversation_id: uuid.value as string,
        sender_id: userStore?.user?.id!,
        content: message.value,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        sender: userStore.user as User,
        views: [],
      });

      axios
          .post(`conversations/${uuid.value}/messages`,
              {content: message.value},
              {headers: {"X-Socket-Id": window.Echo.socketId()}})
          .then(() => {
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {

          });
      message.value = '';
    }
;

const messageCanBeSent = computed(() => message.value.length > 0 || files.value !== undefined);
</script>