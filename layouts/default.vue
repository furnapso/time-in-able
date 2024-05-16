<script setup lang="ts">
import { kApp } from 'konsta/vue'
import {Capacitor} from "@capacitor/core";
const theme = computed(() => Capacitor.getPlatform() === "android" ? "material" : "ios")
</script>

<template>
  <k-app :theme="theme">
    <slot />
  </k-app>
</template>