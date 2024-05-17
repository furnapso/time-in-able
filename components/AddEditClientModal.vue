<script lang="ts" setup>
import {ref} from "vue";
import useNameValidator from "~/composables/nameValidator";

const props = defineProps({
  open: {
    type: Boolean,
    required: true
  }
});
const emit = defineEmits(["save", "close"]);

const defaultNameValue = {
  name: null,
  changed: false
};

const firstName = ref({...defaultNameValue});
const lastName = ref({...defaultNameValue});

const forceValidate = ref(false);
const firstNameError = computed(() => useNameValidator(firstName, forceValidate.value).validateName());
const lastNameError = computed(() => useNameValidator(lastName, forceValidate.value).validateName());
const valid = computed(() => firstNameError.value === null && lastNameError.value === null);

function firstNameChange(e) {
  firstName.value = {
    name: e.target.value,
    changed: true
  };
}

function lastNameChange(e) {
  lastName.value = {
    name: e.target.value,
    changed: true
  };
}

function save() {
  forceValidate.value = true;
}

function cancel() {
  emit("close");
  forceValidate.value = false;
  firstName.value = {...defaultNameValue};
  lastName.value = {...defaultNameValue};
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
        <k-list-input label="First Name" placeholder="First Name" :required="true"
                      @change="firstNameChange" :error="firstNameError" :value="firstName.name"/>
        <k-list-input label="Last Name" placeholder="Last Name" :required="true"
                      @change="lastNameChange" :error="lastNameError" :value="lastName.name"/>
      </k-list>
    </k-block>
  </k-sheet>
</template>
