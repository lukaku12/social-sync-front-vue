<template>
  <div>
    <VButtonIcon
        @click="openFiles"
        class="!pointer-events-none"
        :text="$t('attach_files')"
        icon="IconImageMultiple"
    />
    <v-file-input ref="fileInputRef" multiple :model-value="files" @update:model-value="$emit('setFileValue')" class="!hidden"/>
  </div>
</template>

<script setup lang="ts">
import VButtonIcon from "@/components/layout/button/VButtonIcon.vue";
import {ref} from "vue";

defineProps<{ files: File | File[] | undefined }>();

const fileInputRef = ref<HTMLInputElement | null>(null);

const openFiles = () => {
  if (!fileInputRef.value) return;
  fileInputRef.value.click();
}
</script>
