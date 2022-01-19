<template>
  <v-card dark color="#474b5c" :loading="loading" class="mx-auto my-12" width="300" height="400" >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img
      height="200"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>

    <v-card-title class="text-h6">{{user.first_name + ' ' + user.last_name}}</v-card-title>
    <v-card-text> dupa </v-card-text>
    <v-card-actions>
      <v-col class="ma-">
        <v-btn color="primary" class="mb-2 mt-n4" block > Dodaj do znajomych </v-btn>
        <v-btn color="" block > Zobacz profil </v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  name: "ProfileCard",
  props: {
    user: {
      required: true,
    },
  },
};
</script>

<style scoped></style>
