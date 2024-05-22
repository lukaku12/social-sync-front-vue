<template>
    <v-form
        ref="formElement"
        @submit.prevent="submitForm"
        class="mt-10 space-y-2 sm:mx-auto sm:w-full sm:max-w-sm"
    >
        <FormHeader :title="t('enter_email_address_to_reset_password')" />
        <v-text-field
            v-model="form.email"
            name="email"
            type="text"
            :label="t('email')"
            autocomplete="email"
            variant="outlined"
            density="compact"
            :rules="AuthFormValidation('email')"
        />

        <v-btn :loading="loading" type="submit" class="mt-2" width="100%" color="primary">
            {{ t('reset_password') }}
        </v-btn>

        <FormFooter
            :title="`${t('remember_password')}?`"
            link-to-name="login"
            :link-title="t('sign_in_now')"
        />
    </v-form>
</template>

<script setup lang="ts">
import FormHeader from '@/components/not-authenticated/FormHeader.vue';
import FormFooter from '@/components/not-authenticated/FormFooter.vue';
import { useFormSetup } from '@/composables/form-setup';

const { t, formElement, form, loading, AuthFormValidation } = useFormSetup<{
    email: '';
}>({
    email: '',
});

const submitForm = () => {
    if (!formElement?.value?.isValid) return;
    loading.value = true;

    setTimeout(() => {
        loading.value = false;
    }, 2000);
};
</script>
