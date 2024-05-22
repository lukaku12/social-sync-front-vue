<template>
    <Layout>
        <router-view v-slot="slotProps">
            <component :is="slotProps.Component"></component>
        </router-view>
    </Layout>
</template>

<script setup lang="ts">
import Layout from '@/components/layout/Layout.vue';
</script>
