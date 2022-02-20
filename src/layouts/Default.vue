<template>
  <v-app class="white--text">
    <v-app-bar color="#3d3f50" app elevate-on-scroll class="white--text">
      <v-app-bar-nav-icon
        @click="showSidebar = !showSidebar"
        class="white--text hidden-md-and-up"
      ></v-app-bar-nav-icon>
      <v-toolbar-items>
        <v-text-field
          dense
          outlined
          dark
          autofocus
          background-color="#474b5c"
          placeholder="Szukaj"
          hide-details
          single-line
          class="my-auto"
        >
          <template v-slot:prepend-inner>
            <v-icon color="white">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-toolbar-items>
      <v-spacer></v-spacer>

      <notifications> </notifications>
      <user-menu> </user-menu>
    </v-app-bar>
    <!--    -->
    <Sidebar v-model="showSidebar"></Sidebar>
    <FlashMessage :position="'right bottom'"></FlashMessage>
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
import UserMenu from "@/components/UserMenu";
import Notifications from "@/components/Notifications";

export default {
  name: "Default",
  components: { UserMenu, Notifications, Sidebar },
  data() {
    return {
      showSidebar: this.$vuetify.breakpoint.mdAndUp,
    };
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        router.push({ name: "Login" });
      });
    },
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
};
</script>
<style>
#app {
  background-color: #3d3f50;
}
</style>
