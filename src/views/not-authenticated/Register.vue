<template>
    <v-form
        ref="formElement"
        @submit.prevent="submitForm"
        class="mt-10 space-y-2 sm:mx-auto sm:w-full sm:max-w-sm"
    >
        <FormHeader :title="`${t('no_account')}? ${t('no_problem')}! <br> ${t('sign_up_now')}`" />
        <v-text-field
            v-model="form.name"
            name="name"
            type="text"
            :label="t('name')"
            autocomplete="name"
            variant="outlined"
            density="compact"
            :rules="AuthFormValidation('name')"
        />
        <v-text-field
            v-model="form.last_name"
            name="last_name"
            type="text"
            :label="t('last_name')"
            autocomplete="last_name"
            variant="outlined"
            density="compact"
            :rules="AuthFormValidation('lastName')"
        />
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

        <v-text-field
            v-model="form.password"
            name="password"
            type="password"
            :label="t('password')"
            autocomplete="current-password"
            variant="outlined"
            density="compact"
            :rules="AuthFormValidation('password')"
        />

        <v-text-field
            v-model="form.password_confirmation"
            name="password_confirmation"
            type="password"
            :label="t('confirm_password')"
            autocomplete="password-confirmation"
            variant="outlined"
            density="compact"
            :rules="AuthFormValidation('passwordConfirmation', form.password)"
        />

        <v-btn :loading="loading" type="submit" class="mt-3" width="100%" color="primary">
            {{ t('sign_up') }}
        </v-btn>

        <FormFooter
            :title="`${t('already_a_member')}?`"
            link-to-name="login"
            :link-title="t('sign_in_now')"
        />
    </v-form>
</template>

<script setup lang="ts">
import FormHeader from '@/components/not-authenticated/FormHeader.vue';
import FormFooter from '@/components/not-authenticated/FormFooter.vue';
import { useFormSetup } from '@/composables/form-setup';
import axios from '@/config/axios';
import { useRouter } from 'vue-router';

const router = useRouter();

const { t, formElement, form, loading, AuthFormValidation, apiErrors } = useFormSetup<{
    name: '';
    last_name: '';
    email: '';
    password: '';
    password_confirmation: '';
}>({
    name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submitForm = () => {
    if (!formElement?.value?.isValid) return;
    loading.value = true;

    axios
        .post('register', form.value)
        .then(() => {
            router.replace({ name: 'login' });
        })
        .catch(err => {
            apiErrors.value = err?.response?.data?.errors;
        })
        .finally(() => {
            loading.value = false;
        });
};
</script>
