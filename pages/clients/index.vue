<script lang="ts" setup>
import useNavbarTitle from "~/composables/navbarTitle";

useHead({
  title: "Clients"
});

useNavbarTitle().setNavbarTitle("Clients");
</script>

<template>
  <k-block>Hello!</k-block>
</template>