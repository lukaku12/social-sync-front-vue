<template>
  <v-menu :close-on-content-click="closeOnClick" :location="textLocation">
    <template v-slot:activator="{ props: menu }">
      <v-tooltip :location="textLocation" :text="text">
        <template v-slot:activator="{ props: tooltip }">
          <v-btn @click="$emit('click')" icon="" :size="size" variant="flat" :type="type" v-bind="mergeProps(menu, tooltip)">
            <v-icon v-if="currentIcon?.icon">
              <component :is="currentIcon.icon" :fill-color="primaryColor"/>
            </v-icon>
          </v-btn>
        </template>
      </v-tooltip>
    </template>
    <slot/>
  </v-menu>
</template>

<script setup lang="ts">
import IconPhone from "@/components/icons/IconPhone.vue";
import IconVideo from "@/components/icons/IconVideo.vue";
import IconInfo from "@/components/icons/IconInfo.vue";
import IconPlusFilled from "@/components/icons/IconPlusFilled.vue";
import IconImageMultiple from "@/components/icons/IconImageMultiple.vue";
import IconStickerEmoji from "@/components/icons/IconStickerEmoji.vue";
import IconFileGifBox from "@/components/icons/IconFileGifBox.vue";
import IconEmoticonHappy from "@/components/icons/IconEmoticonHappy.vue";
import IconThumbsUp from "@/components/icons/IconThumbsUp.vue";
import IconSend from "@/components/icons/IconSend.vue";
import {mergeProps, PropType} from "vue";
import {useTheme} from "@/composables/theme";

type Icon =
    'IconPhone'
    | 'IconVideo'
    | 'IconInfo'
    | 'IconPlusFilled'
    | 'IconImageMultiple'
    | 'IconStickerEmoji'
    | 'IconFileGifBox'
    | 'IconEmoticonHappy'
    | 'IconThumbsUp'
    | 'IconSend';

type TextLocation = 'top' | 'bottom' | 'left' | 'right';

const {icon} = defineProps({
  icon: {
    type: String as PropType<Icon>,
    required: true
  },
  size: {
    type: String,
    default: '34'
  },
  text: {
    type: String,
    default: ''
  },
  textLocation: {
    type: String as PropType<TextLocation>,
    default: 'top'
  },
  closeOnClick: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  }
})


const iconArray = [
  {name: 'IconPhone', icon: IconPhone},
  {name: 'IconVideo', icon: IconVideo},
  {name: 'IconInfo', icon: IconInfo},
  {name: 'IconPlusFilled', icon: IconPlusFilled},
  {name: 'IconImageMultiple', icon: IconImageMultiple},
  {name: 'IconStickerEmoji', icon: IconStickerEmoji},
  {name: 'IconFileGifBox', icon: IconFileGifBox},
  {name: 'IconEmoticonHappy', icon: IconEmoticonHappy},
  {name: 'IconThumbsUp', icon: IconThumbsUp},
  {name: 'IconSend', icon: IconSend},
]

const currentIcon = iconArray.find(i => i.name === icon);

const {primaryColor} = useTheme();
</script>