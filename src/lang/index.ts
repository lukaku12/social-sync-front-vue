import {createI18n} from 'vue-i18n'
import messagesEn from "@/lang/translations/en";
import messagesKa from "@/lang/translations/ka";
import validationTranslation from "@/validation/index.translate.ts";

const i18n = createI18n({
    allowComposition: true,
    legacy: false,
    locale: localStorage.getItem("locale") || "ka",
    fallbackLocale: "en",
    messages: {
        en: {
            ...messagesEn,
            ...validationTranslation.en
        },
        ka: {
            ...messagesKa,
            ...validationTranslation.ka
        }
    }
})

export default i18n;