<script lang="ts" setup>
import useNotification from "~/composables/notification";
import type { NotificationData } from "~/composables/notification";
import type { Ref } from "vue";

const TIMEOUT = 5000;
const DELAY_BETWEEN_NOTIFICATIONS = 500;

const { stack, shift } = useNotification();
const activeNotification: Ref<NotificationData | null> = ref(null);
const ready = ref(true);

function goNext() {
  activeNotification.value.open = false;
  setTimeout(() => {
    ready.value = true;
  }, DELAY_BETWEEN_NOTIFICATIONS);
}

watch([stack, ready], () => {
  console.log(stack.value, ready.value);
  if (stack.value && stack.value.length > 0 && ready.value) {
    activeNotification.value = { ...shift(), open: true };
    ready.value = false;
    setTimeout(goNext, TIMEOUT);
  }
});
</script>

<template>
  <k-notification
    v-if="activeNotification"
    :title="activeNotification.title"
    :subtitle="activeNotification.subtitle"
    :opened="activeNotification.open"
    :text="activeNotification.text"
    @click="goNext"
  />
</template>
