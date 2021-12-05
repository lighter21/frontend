<template>
  <v-app>
    <v-app-bar app>
      <v-btn @click="logout"> Wyloguj </v-btn>
    </v-app-bar>

    <v-main>
      <v-main>
        <v-container>
          <router-view></router-view>
        </v-container>
      </v-main>
    </v-main>
  </v-app>
</template>

<script>
import { LOGOUT } from "@/store/actions.type";
import router from "@/router";

export default {
  name: "Default",
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        router.push({ name: "Login" });
      });
    },
  },
};
</script>
