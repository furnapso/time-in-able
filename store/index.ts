import {defineStore} from "pinia";
import type {Ref} from "vue";
import addIdIfMissing from "~/util/id";
import type {Client, Task} from "~/model/model";

export const useAppStore = defineStore("app", () => {
    const clients: Ref<Client[]> = ref([]);
    const tasks: Ref<Task[]> = ref([]);

    function addClient(client: Client) {
        addIdIfMissing(client);
        clients.value.push(client);
    }

    function addTask(task: Task) {
        addIdIfMissing(task);
        tasks.value.push(task);
    }

    return {clients, tasks, addClient, addTask};
});
