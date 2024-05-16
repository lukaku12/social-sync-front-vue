import {createApp} from 'vue';
import '@/style.css';
import '@/config/echo';
import App from '@/App.vue';
import router from "@/router";
import vuetify from "@/config/vuetify";
import i18n from "@/lang";
import pinia from "@/store";

const app = createApp(App);

app.use(i18n);
app.use(router);
app.use(vuetify);
app.use(pinia);

app.mount('#app');
