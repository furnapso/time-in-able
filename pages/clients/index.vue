<script lang="ts" setup>
import useNavbarTitle from "~/composables/navbarTitle";
import { useAppStore } from "~/store";
import type { Client } from "~/model/model";

useHead({
  title: "Clients",
});

const clients = computed(() => useAppStore().clients);
const { addClient } = useAppStore();

const clientModalOpen = ref(false);

useNavbarTitle().setNavbarTitle("Clients");

function handleSave(client: Client) {
  clientModalOpen.value = false;
  addClient(client);
}
</script>

<template>
  <k-toolbar :outline="false" inner-class="!justify-end">
    <k-link toolbar @click="clientModalOpen = true">Add</k-link>
  </k-toolbar>
  <k-block strong>
    <p v-if="clients.length === 0">
      You don't have any clients. Click the Add button to add a new client.
    </p>
    <k-list strong inset>
      <k-list-item
        v-for="client in clients"
        :title="`${client.firstName} ${client.lastName}`"
        link
        after="Edit"
      />
    </k-list>
  </k-block>
  <client-modal
    :open="clientModalOpen"
    @close="clientModalOpen = false"
    @save="handleSave"
  />
</template>
