<script lang="ts" setup>
import useNavbarTitle from "~/composables/navbarTitle";
import { useAppStore } from "~/store";
import type { Client } from "~/model/model";
import useEditingClient from "~/composables/editingClient";
import useNotification from "~/composables/notification";

useHead({
  title: "Clients",
});

const clients = computed(() => useAppStore().clients);
const { saveClient, deleteClient } = useAppStore();
const { setEditingClient } = useEditingClient();
const { createNotification } = useNotification();

const clientModalOpen = ref(false);

useNavbarTitle().setNavbarTitle("Clients");

function onClientEditClicked(client: Client) {
  setEditingClient(client);
  clientModalOpen.value = true;
}

function onAddClicked() {
  setEditingClient();
  clientModalOpen.value = true;
}

function onClientSave(client: Client) {
  clientModalOpen.value = false;
  saveClient(client);
  createNotification("Client Saved", `${client.firstName} ${client.lastName}`);
}

function onClientDelete(client: Client) {
  clientModalOpen.value = false;
  deleteClient(client);
  createNotification(
    "Client Deleted",
    `${client.firstName} ${client.lastName}`,
  );
}
</script>

<template>
  <k-toolbar :outline="false" inner-class="!justify-end">
    <k-link toolbar @click="onAddClicked">Add</k-link>
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
        @click="onClientEditClicked(client)"
      />
    </k-list>
  </k-block>
  <client-modal
    :open="clientModalOpen"
    @close="clientModalOpen = false"
    @save="onClientSave"
    @delete="onClientDelete"
  />
</template>
