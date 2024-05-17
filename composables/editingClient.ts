import type { Client } from "~/model/model";
import type { Ref } from "vue";

const editingClient: Ref<Client | null | undefined> = ref();

export default function useEditingClient() {
  function setEditingClient(client?: Client) {
    editingClient.value = client;
  }

  return { editingClient, setEditingClient };
}
