<template>
  <v-card>
    <v-tabs
      v-model="tab"
      centered
      background-color="#282b35"
      dark
      icons-and-text
    >
      <v-tabs-slider></v-tabs-slider>

      <v-tab :to="getTabRouteObject('general')">
        Ogólne
        <v-icon>mdi-account</v-icon>
      </v-tab>

      <v-tab :to="getTabRouteObject('password')">
        Zmiana hasła
        <v-icon>mdi-lock</v-icon>
      </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab">
      <v-tab-item :value="getTabRoutePath('general')">
        <general-data> </general-data>
      </v-tab-item>
      <v-tab-item :value="getTabRoutePath('password')">
        <password-change> </password-change>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import GeneralData from "@/views/Account/_GeneralData";
import PasswordChange from "@/views/Account/_PasswordChange";
export default {
  name: "Details",
  components: { PasswordChange, GeneralData },
  data() {
    return {
      tab: null,
    };
  },
  methods: {
    getTabRouteObject(tabName) {
      return {
        name: "AccountDetails",
        params: {
          tab: tabName,
        },
      };
    },

    getTabRoutePath(tabName) {
      let routeObject = this.getTabRouteObject(tabName);
      let location = this.$router.resolve(routeObject);
      return location.href;
    },
  },
};
</script>

<style scoped></style>
