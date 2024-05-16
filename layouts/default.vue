<script setup lang="ts">
import {Capacitor} from "@capacitor/core";
import {kApp, Tabbar, TabbarLink} from "konsta/vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";

const theme = computed(() => Capacitor.getPlatform() === "android" ? "material" : "ios")
</script>

<template>
  <k-app :theme="theme">
    <div class="h-full w-full">
      <slot/>
      <Tabbar :icons="true" class="bottom-0 left-0 fixed">
        <tabbar-link label="Home">
          <template #icon>
            <font-awesome-icon :icon="faHouse"/>
          </template>
        </tabbar-link>
      </Tabbar>
    </div>
    <slot/>
  </k-app>
</template>