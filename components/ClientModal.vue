<script lang="ts" setup>
import { ref } from "vue";
import useNameValidator from "~/composables/nameValidator";
import { capitalize } from "lodash";
import type { Client } from "@/model/model";

const props = defineProps<{
  open: boolean;
  client: Client | null;
}>();
const emit = defineEmits(["save", "close"]);

export interface NameValue {
  name: string | null;
  changed: boolean;
}

const defaultNameValue: NameValue = {
  name: null,
  changed: false,
};

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
    });
    reset();
  }
}

function cancel() {
  emit("close");
  reset();
}
</script>

<template>
  <k-sheet :opened="props.open" @backdropclick="emit('close')" class="w-screen">
    <k-toolbar top>
      <k-link toolbar @click="cancel">Cancel</k-link>
      <span>Add new client</span>
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
    </k-block>
  </k-sheet>
</template>
