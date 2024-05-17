<script setup lang="ts">
import {Capacitor} from "@capacitor/core";
import {faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import useNavbarTitle from "~/composables/navbarTitle";

const theme = computed(() => Capacitor.getPlatform() === "android" ? "material" : "ios");

useHead({
  titleTemplate(title) {
    return title ? `${title} | Time in Able` : "Time in Able";
  }
});

const {navbarTitle} = useNavbarTitle();
</script>

<template>
  <k-app :theme="theme">
    <k-page>
      <k-navbar :title="navbarTitle"/>
      <slot/>
      <k-tabbar :icons="true" class="bottom-0 left-0 fixed">
        <k-tabbar-link label="Clients" href="/clients" :active="useRoute().path.includes('clients')">
          <template #icon>
            <font-awesome-icon :icon="faUser"/>
          </template>
        </k-tabbar-link>
      </k-tabbar>
    </k-page>
  </k-app>
</template>