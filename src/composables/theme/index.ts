import {computed} from "vue";
import {useTheme as themeModifier} from "vuetify";

export function useTheme() {
    const theme = themeModifier();

    const toggleTheme = () => {
        theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark';
        localStorage.setItem('theme', theme.global.name.value);
    }

    const currentThemeMode = computed(() => theme.global.current.value.dark ? 'white' : 'black');

    const primaryColor = computed(() => theme.global.current.value.colors.primary);

    return {
        toggleTheme,
        currentThemeMode,
        primaryColor,
    }
}