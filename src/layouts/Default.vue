<template>
  <v-app class="white--text">
    <Navbar v-model="showSidebar"></Navbar>
    <Sidebar :show-sidebar="showSidebar"></Sidebar>

    <v-main>
      <v-container>
        <router-view></router-view>

      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { LOGOUT } from "@/store/actions.type";
import router from "@/router";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default {
  name: "Default",
  components: { Navbar, Sidebar },
  data() {
    return {
      showSidebar: true
    }
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        router.push({ name: "Login" });
      });
    },
  },
};
</script>
<style>
#app {
  background-color: #3d3f50;
}
</style>
