import { defineStore } from "pinia";
import type { Ref } from "vue";
import addIdIfMissing from "~/util/id";
import type { Client, Task } from "~/model/model";

export const useAppStore = defineStore("app", () => {
  const clients: Ref<Client[]> = ref([]);
  const tasks: Ref<Task[]> = ref([]);

  function saveClient(client: Client) {
    addIdIfMissing(client);
    const index = clients.value.findIndex((i) => i.id === client.id);
    if (index > -1) {
      clients.value[index] = client;
    } else {
      clients.value.push(client);
    }

    clients.value = [...clients.value];
  }

  function addTask(task: Task) {
    addIdIfMissing(task);
    tasks.value.push(task);
  }

  function deleteClient(client: Client) {
    const index = clients.value.findIndex((i) => i.id === client.id);
    if (index > -1) {
      clients.value.splice(index, 1);
      clients.value = [...clients.value];
    }
  }

  return { clients, tasks, saveClient, addTask, deleteClient };
});
