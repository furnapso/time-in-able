import { useStorage } from "~/composables/storage";
import { useAppStore } from "~/store";

const STORAGE_KEY = "app";

export default defineNuxtPlugin((nuxtApp) => {
  const storage = useStorage();

  useAppStore().$subscribe(async (mutation, state) => {
    await storage.set(STORAGE_KEY, JSON.stringify(state));
  });

  async function init() {
    const persistedData = await storage.get(STORAGE_KEY);
    if (persistedData !== null) {
      const parsedData = JSON.parse(persistedData);
      useAppStore().$patch(parsedData);
    }
  }

  init();
});
