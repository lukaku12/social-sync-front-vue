<template>
    <main class="grid min-h-full place-items-center">
        <v-container fluid class="w-100">
            <v-container class="w-100 flex flex-col items-center justify-center">
                <h1 class="text-5xl font-bold">404</h1>
                <h1 class="text-gray-900 mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
                    Page not found
                </h1>
                <p class="text-gray-600 mt-6 text-base leading-7">
                    Sorry, we could’t find the page you’re looking for.
                </p>
                <div class="mt-10 flex items-center justify-center gap-x-6">
                    <router-link :to="{ name: 'home' }">
                        <v-btn rounded variant="outlined"> Go back home </v-btn>
                    </router-link>
                </div>
            </v-container>
        </v-container>
    </main>
</template>

<script setup lang="ts"></script>
