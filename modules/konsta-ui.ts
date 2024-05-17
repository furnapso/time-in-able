import { addComponentsDir, defineNuxtModule, resolvePath } from "@nuxt/kit";

export default defineNuxtModule(async (inlineOptions, nuxt) => {
  await addComponentsDir({
    path: await resolvePath("@@/node_modules/konsta/vue/components"),
    prefix: "k",
  });
});
