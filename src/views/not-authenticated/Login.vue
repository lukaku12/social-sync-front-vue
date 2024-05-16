<template>
  <v-form
      ref="formElement"
      @submit.prevent="submitForm"
      class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm space-y-2"
  >
    <FormHeader :title="t('sign_in_to_your_account')"/>
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

    <router-link
        :to="{name: 'forgot-password'}"
        class="font-semibold !mt-0 text-indigo-600 hover:text-indigo-500 float-end text-sm">
      {{ t('forgot_password') }}?
    </router-link>

    <v-btn :loading="loading" type="submit" class="mt-3" width="100%" color="primary">
      {{ t('sign_in') }}
    </v-btn>

    <FormFooter
        :title="t('not_a_member') + '?' "
        link-to-name="register"
        :link-title="t('sign_up_now')"
    />

  </v-form>
</template>

<script setup lang="ts">
import FormHeader from "@/components/not-authenticated/FormHeader.vue";
import FormFooter from "@/components/not-authenticated/FormFooter.vue";
import {useFormSetup} from "@/composables/form-setup";
import axios, {setToken} from "@/config/axios";
import {useRouter} from "vue-router";

const router = useRouter();

const {t, formElement, form, loading, AuthFormValidation, apiErrors} = useFormSetup<{
  email: string,
  password: string
}>({
  email: '',
  password: ''
});


const submitForm = () => {
  if (!formElement?.value?.isValid) return;
  loading.value = true;

  axios
      .post('login', form.value)
      .then((res) => {
        setToken(res.data.access_token);
        router.replace({name: 'home'});
      })
      .catch((err) => {
        apiErrors.value = err?.response?.data?.errors;
      })
      .finally(() => {
        loading.value = false;
      });
}
// onMounted(() => {
//   console.log(formElement?.value)
// })

</script>