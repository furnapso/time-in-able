<script setup lang="ts">
import {Tabbar, TabbarLink} from "konsta/vue";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import {faHouse} from "@fortawesome/free-solid-svg-icons";
</script>

<template>
  <div class="h-full w-full">
    <Tabbar :icons="true" class="bottom-0 left-0 fixed">
      <tabbar-link label="Home">
        <template #icon>
          <font-awesome-icon :icon="faHouse" />
        </template>
      </tabbar-link>
    </Tabbar>
  </div>
</template>
