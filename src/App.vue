<script setup lang="ts">
import { RouterView } from 'vue-router'
import { NConfigProvider, zhCN, dateZhCN } from 'naive-ui'
import { theme, themeOverrides } from './themes'
</script>

<template>
  <NConfigProvider
    :theme="theme"
    :theme-overrides="themeOverrides"
    :locale="zhCN"
    :date-locale="dateZhCN"
    abstract
  >
    <RouterView />
  </NConfigProvider>
</template>
