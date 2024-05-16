import {ref, watch} from 'vue'
import {useI18n} from "vue-i18n";
import rules from "@/validation/auth-form-validation/index.ts";
import {formElement} from "@/composables/form-setup/types.ts";

export function useFormSetup<T>(formData: T) {
    const {t, locale} = useI18n();
    const AuthFormValidation = rules(t);

    const form = ref(formData);
    const formElement = ref<formElement>(null);
    const apiErrors = ref({});
    const loading = ref(false);

    watch(locale, () => {
        if (!formElement?.value) return;

        // replace the current errors with current locale errors if the locale changes

        const ItemsThatHaveErrors: string[] = [];

        formElement?.value?.errors.forEach((error) => {
            ItemsThatHaveErrors.push(error.id);
        })

        const itemsToValidate: { id: string, validate: () => {} }[] = [];

        ItemsThatHaveErrors.forEach(key => {
            if (!formElement?.value?.items) return;

            itemsToValidate.push(formElement?.value?.items.filter((item) => item.id === key)[0])
        })

        itemsToValidate.forEach((item) => {
            item.validate();
        })

    })

    return {
        t,
        form,
        formElement,
        loading,
        AuthFormValidation,
        apiErrors
    }
}