<template>
    <v-card rounded="0" variant="flat" class="overflow-visible border-b">
        <div
            :class="
                userStore.userIsLoggedIn
                    ? 'h-[65px] justify-between '
                    : 'absolute h-auto justify-end'
            "
            class="flex w-full px-2 pt-2"
        >
            <div class="relative" v-if="userStore.userIsLoggedIn">
                <router-link title="SocialSync" :to="{ name: 'home' }">
                    <v-btn rounded height="48" variant="outlined">
                        <v-icon>
                            <IconLogo :fill-color="currentThemeMode" :animate="false" />
                        </v-icon>
                        <span>SocialSync</span>
                    </v-btn>
                </router-link>
            </div>

            <div class="flex gap-x-2" :class="userStore.userIsLoggedIn ? '' : ''">
                <v-menu :close-on-content-click="false" location="bottom">
                    <template v-slot:activator="{ props: menu }">
                        <v-btn
                            v-if="userStore.userIsLoggedIn"
                            v-bind="menu"
                            :title="$t('notifications')"
                            icon=""
                            variant="outlined"
                        >
                            <v-icon>
                                <IconBell :fill-color="currentThemeMode" />
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-card class="mx-auto flex w-auto flex-col items-center justify-center">
                        <v-card-text>
                            {{ $t('you_dont_have_notifications') }}
                        </v-card-text>
                    </v-card>
                </v-menu>

                <v-menu
                    v-if="userStore.userIsLoggedIn"
                    :key="userStore.user"
                    :close-on-content-click="false"
                    location="bottom"
                >
                    <template v-slot:activator="{ props: menu }">
                        <div v-bind="menu" class="relative">
                            <v-btn icon="" variant="outlined" class="px-0 py-0">
                                <v-avatar
                                    :image="userStore?.user?.image"
                                    size="46.2"
                                    class="!absolute left-0 top-0"
                                />
                            </v-btn>
                        </div>
                    </template>
                    <v-card class="mx-auto flex w-auto flex-col items-center justify-center">
                        <v-card-text
                            class="flex max-h-[300px] max-w-[300px] flex-col gap-y-4 overflow-y-auto"
                        >
                            <div class="w-full break-words text-center">
                                <span class="w-full text-center text-3xl">
                                    {{ userStore?.user?.name }} {{ userStore?.user?.last_name }}
                                </span>
                            </div>

                            <div class="flex gap-x-2">
                                <v-select
                                    v-model="selectedLanguage"
                                    @update:modelValue="setLanguage"
                                    :items="languages"
                                    rounded
                                    hide-details
                                    class="w-[140px]"
                                    :item-props="languageProps"
                                    density="comfortable"
                                    variant="outlined"
                                />

                                <v-btn
                                    :title="$t('toggle_theme')"
                                    icon=""
                                    variant="outlined"
                                    @click="toggleTheme"
                                >
                                    <v-icon>
                                        <IconTheme
                                            :theme="currentThemeMode"
                                            :fill-color="currentThemeMode"
                                        />
                                    </v-icon>
                                </v-btn>
                            </div>
                        </v-card-text>
                    </v-card>
                </v-menu>

                <div v-else class="flex gap-x-2">
                    <v-select
                        v-model="selectedLanguage"
                        @update:modelValue="setLanguage"
                        :items="languages"
                        rounded
                        hide-details
                        class="w-[140px]"
                        :item-props="languageProps"
                        density="comfortable"
                        variant="outlined"
                    />

                    <v-btn
                        :title="$t('toggle_theme')"
                        icon=""
                        variant="outlined"
                        @click="toggleTheme"
                    >
                        <v-icon>
                            <IconTheme :theme="currentThemeMode" :fill-color="currentThemeMode" />
                        </v-icon>
                    </v-btn>
                </div>

                <v-dialog>
                    <template v-slot:activator="{ props: activatorProps }">
                        <v-btn
                            v-if="userStore.userIsLoggedIn"
                            v-bind="activatorProps"
                            icon=""
                            :title="$t('sign_out')"
                            :loading="userStore.isLoggingOut"
                            variant="outlined"
                        >
                            <v-icon>
                                <IconLogOut :fill-color="currentThemeMode" />
                            </v-icon>
                        </v-btn>
                    </template>
                    <template v-slot:default="{ isActive }">
                        <v-card
                            :title="$t('sign_out')"
                            class="mx-auto flex w-auto flex-col items-center justify-center"
                        >
                            <v-card-text>
                                {{ $t('are_you_sure_you_want_to_sign_out') + '?' }}
                            </v-card-text>
                            <v-card-actions>
                                <v-btn :text="$t('cancel')" @click="isActive.value = false"></v-btn>
                                <v-btn
                                    :text="$t('sign_out')"
                                    :loading="userStore.isLoggingOut"
                                    @click="userStore.logout(isActive)"
                                ></v-btn>
                            </v-card-actions>
                        </v-card>
                    </template>
                </v-dialog>
            </div>
        </div>
    </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useTheme } from '@/composables/theme';
import IconLogo from '@/components/icons/IconLogo.vue';
import IconLogOut from '@/components/icons/IconLogOut.vue';
import IconTheme from '@/components/icons/IconTheme.vue';
import IconBell from '@/components/icons/IconBell.vue'; //

defineProps({
    userStore: {
        type: Object,
        required: true,
    },
});

const { locale, t } = useI18n();

const selectedLanguage = ref(locale.value);

const languages = [
    { name: 'english', code: 'en' },
    { name: 'georgian', code: 'ka' },
];

const languageProps = (item: { name: string; code: string }) => {
    return {
        title: t(item.name),
        value: item.code,
    };
};

const setLanguage = () => {
    locale.value = selectedLanguage.value;
    localStorage.setItem('locale', selectedLanguage.value);
};

const { currentThemeMode, toggleTheme } = useTheme();
</script>
