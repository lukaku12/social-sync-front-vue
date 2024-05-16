<template>
  <main class="grid min-h-full place-items-center">
    <v-container fluid class="w-100">
      <v-container class="w-100 flex justify-center flex-col items-center">


        <h1 class="text-5xl font-bold">404</h1>
        <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Page not found
        </h1>
        <p class="mt-6 text-base leading-7 text-gray-600">
          Sorry, we could’t find the page you’re looking for.
        </p>
        <div class="mt-10 flex items-center justify-center gap-x-6">
          <router-link :to="{name: 'home'}">
            <v-btn rounded variant="outlined" >
              Go back home
            </v-btn>
          </router-link>
        </div>

      </v-container>
    </v-container>
  </main>

</template>

<script setup lang="ts">

</script>
