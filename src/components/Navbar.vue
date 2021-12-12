<template>
  <v-app-bar color="transparent" app elevate-on-scroll class="white--text">
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

    <v-btn icon>
      <v-icon color="white">mdi-heart</v-icon>
    </v-btn>

    <v-btn icon>
      <v-icon color="white">mdi-dots-vertical</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Navbar",
  props: ["value"],
  methods: {
    toggleSidebar() {
      this.$emit("input", !this.value);
    },
  },
};
</script>

<style scoped></style>
