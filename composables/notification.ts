import type { Ref } from "vue";

const stack: Ref<NotificationData[]> = ref([]);

export interface NotificationData {
  open: boolean;
  title: string;
  subtitle: string;
  text: string;
}

export default function useNotification() {
  function createNotification(title: string, text: string) {
    stack.value.push({
      open: false,
      title: "Time in Able",
      subtitle: title,
      text,
    } as NotificationData);
    stack.value = [...stack.value];
  }

  function shift() {
    const shifted = stack.value.shift();
    stack.value = [...stack.value];
    return shifted;
  }

  return { stack, createNotification, shift };
}
