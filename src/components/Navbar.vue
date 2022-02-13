<template>
  <v-app-bar color="#3d3f50" app elevate-on-scroll class="white--text">
    <v-app-bar-nav-icon
      @click="toggleSidebar"
      class="white--text hidden-sm-and-up"
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
</template>

<script>
import Notifications from "@/components/Notifications";
import UserMenu from "@/components/UserMenu";

export default {
  name: "Navbar",
  components: { UserMenu, Notifications },
  props: ["value"],
  methods: {
    toggleSidebar() {
      this.$emit("input", !this.value);
    },
  },
};
</script>

<style scoped></style>
