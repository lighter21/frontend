<template>
  <v-navigation-drawer
    app
    width="320"
    dark
    color="#282b35"
    class="white--text"
    :permanent="$vuetify.breakpoint.mdAndUp"
    v-model="showSidebar"
  >
    <template v-slot:prepend>
      <v-col class="my-6">
        <v-row class="mx-6 mb-6">
          <v-img max-width="30" :src="logo"></v-img>
          <p class="mx-5 display-1 my-auto"><span class="logo">Stuck!</span></p>
        </v-row>
        <v-row justify="center">
          <v-avatar color="grey" size="86">
            <v-img :src="user.parsed_avatar_path"></v-img>
          </v-avatar>
        </v-row>
        <v-row justify="center" class="font-weight-bold">
          {{ user.first_name + " " + user.last_name }}
        </v-row>
        <v-row justify="center" style="font-size: 0.75rem"
          >{{ user.email }}
        </v-row>
      </v-col>
    </template>

    <v-divider></v-divider>
    <v-list>
      <v-list-item
        v-for="item in headers"
        :key="item.title"
        class="ml-4"
        :to="item.to"
      >
        <v-list-item-icon>
          <v-icon color="white">{{ item.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title class="white--text"
            >{{ item.title }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-list-item class="ml-4" @click="logout">
      <v-list-item-icon>
        <v-icon color="white">mdi-logout</v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-list-item-title class="white--text"> Wyloguj</v-list-item-title>
      </v-list-item-content>
    </v-list-item>
  </v-navigation-drawer>
</template>

<script>
import s from "@/assets/s.png";
import { mapState } from "vuex";
import { LOGOUT } from "@/store/actions.type";

export default {
  name: "Sidebar",
  props: ["value"],
  data() {
    return {
      showSidebar: this.value,
      logo: s,
    };
  },
  watch: {
    value: function (newVal) {
      this.showSidebar = newVal
    },
    showSidebar: function (newVal) {
      this.$emit("input", newVal)
    }
  },
  computed: {
    ...mapState({
      error: (state) => state.auth.error,
      loading: (state) => state.auth.loading,
      isAuthenticated: (state) => state.auth.isAuthenticated,
      user: (state) => state.auth.user,
    }),
    headers() {
      return [
        {
          title: "Strona główna",
          icon: "mdi-home-city",
          to: "/",
        },
        {
          title: "Moje Konto",
          icon: "mdi-account",
          to: `/user/${this.user.username}`,
        },
        {
          title: "Użytkownicy",
          icon: "mdi-account-multiple",
          to: "/users",
        },
        {
          title: "Grupy",
          icon: "mdi-account-group-outline",
          to: "/groups",
        },
      ];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Kings&display=swap");

.logo {
  font-family: "Kings", cursive;
}
</style>
