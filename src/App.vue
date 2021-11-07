<template>
  <v-app>
    <v-main>
      <navbar />
      <section class="section">
        <div class="container is-desktop">
          <router-view />
        </div>
      </section>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Navbar from "./components/Navbar/Navbar.component.vue";

export default Vue.extend({
  name: "app",
  components: { Navbar },
});
</script>
