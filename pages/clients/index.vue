<script lang="ts" setup>
import useNavbarTitle from "~/composables/navbarTitle";
import {useAppStore} from "~/store";

useHead({
  title: "Clients"
});

const clients = computed(() => useAppStore().clients);

const clientModalOpen = ref(false);

useNavbarTitle().setNavbarTitle("Clients");
</script>

<template>
  <k-toolbar :outline="false" inner-class="!justify-end">
    <k-link toolbar @click="clientModalOpen = true">Add</k-link>
  </k-toolbar>
  <k-block strong>
    <p v-if="clients.length === 0">
      You don't have any clients. Click the Add button to add a new client.
    </p>
  </k-block>
  <add-edit-client-modal :open="clientModalOpen" @close="clientModalOpen = false"/>
</template>