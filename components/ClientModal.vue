<script lang="ts" setup>
import { ref } from "vue";
import useNameValidator from "~/composables/nameValidator";
import { capitalize } from "lodash";
import useEditingClient from "~/composables/editingClient";

const props = defineProps<{
  open: boolean;
}>();
const emit = defineEmits(["save", "close", "delete"]);

export interface NameValue {
  name?: string | null;
  changed: boolean;
}

const defaultNameValue: NameValue = {
  name: null,
  changed: false,
};

const { editingClient } = useEditingClient();

const firstName = ref({ ...defaultNameValue });
const lastName = ref({ ...defaultNameValue });

const forceValidate = ref(false);
const firstNameError = computed(() =>
  useNameValidator(firstName, forceValidate.value).validateName(),
);
const lastNameError = computed(() =>
  useNameValidator(lastName, forceValidate.value).validateName(),
);
const valid = computed(
  () => firstNameError.value === null && lastNameError.value === null,
);

function firstNameChange(e) {
  firstName.value = {
    name: capitalize(e.target.value).trim(),
    changed: true,
  };
}

function lastNameChange(e) {
  lastName.value = {
    name: capitalize(e.target.value).trim(),
    changed: true,
  };
}

function reset() {
  forceValidate.value = false;
  firstName.value = { ...defaultNameValue };
  lastName.value = { ...defaultNameValue };
}

function save() {
  forceValidate.value = true;
  if (valid.value) {
    emit("save", {
      firstName: firstName.value.name,
      lastName: lastName.value.name,
      id: editingClient.value?.id,
    });
    reset();
  }
}

function cancel() {
  emit("close");
  reset();
}

watch(editingClient, () => {
  reset();
  if (editingClient.value) {
    firstName.value.name = editingClient.value?.firstName;
    lastName.value.name = editingClient.value?.lastName;
  }
});

const deleteDialog = ref(false);

function onDelete() {
  if (editingClient.value) {
    emit("delete", editingClient.value);
  }
  deleteDialog.value = false;
}
</script>

<template>
  <k-sheet :opened="props.open" @backdropclick="emit('close')" class="w-screen">
    <k-toolbar top>
      <k-link toolbar @click="cancel">Cancel</k-link>
      <span>{{ !!editingClient ? "Edit" : "Add new" }} client</span>
      <k-link toolbar @click="save">Save</k-link>
    </k-toolbar>
    <k-block>
      <k-list strong inset>
        <k-list-input
          label="First Name"
          placeholder="First Name"
          :required="true"
          @change="firstNameChange"
          :error="firstNameError"
          :value="firstName.name"
          clear-button
          @clear="firstName.name = ''"
          autocapitalize="words"
        />
        <k-list-input
          label="Last Name"
          placeholder="Last Name"
          :required="true"
          @change="lastNameChange"
          :error="lastNameError"
          :value="lastName.name"
          clear-button
          @clear="lastName.name = ''"
        />
      </k-list>
      <k-button
        v-if="editingClient"
        class="bg-red-500"
        @click="deleteDialog = true"
        >Delete
      </k-button>
      <k-dialog
        :opened="deleteDialog"
        @backdropclick="deleteDialog = false"
        v-if="editingClient"
      >
        <template #title> Delete Client</template>
        Are you sure you want to delete {{ editingClient.firstName }}
        {{ editingClient.lastName }}?
        <template #buttons>
          <k-dialog-button @click="deleteDialog = false"
            >Cancel
          </k-dialog-button>
          <k-dialog-button class="bg-red-500 text-slate-100" @click="onDelete">
            Delete
          </k-dialog-button>
        </template>
      </k-dialog>
    </k-block>
  </k-sheet>
</template>
