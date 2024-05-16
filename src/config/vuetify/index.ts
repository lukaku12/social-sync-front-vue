import 'vuetify/styles';
import {createVuetify, ThemeDefinition} from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css'

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

const savedTheme = localStorage.getItem('theme');

const theme =  savedTheme ?  savedTheme === 'dark' : prefersDark;

const MyCustomTheme: ThemeDefinition = {
    dark: theme,
    colors: {
        primary: 'rgb(79,70,229)',
        secondary: '#4f46e5',
    },
}

const vuetify = createVuetify({
    components,
    directives,
    theme: {
        defaultTheme: 'MyCustomTheme',
        themes: {
            MyCustomTheme,
        }
    }
})

export default vuetify;