<template>
  <v-card
    dark
    color="#474b5c"
    :loading="$apollo.loading"
    class="ma-2"
    width="300"
    height="370"
  >
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

    <v-card-title class="text-h6"
      >{{ user.first_name + " " + user.last_name }}
    </v-card-title>
    <v-card-actions>
      <v-col class="ma-">
        <v-btn color="primary" class="mb-2 mt-n4" block @click="addFriend">
          Dodaj do znajomych
        </v-btn>
        <v-btn color="" block :to="`/user/${user.username}`"> Zobacz profil</v-btn>
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { CREATE_RELATIONSHIP } from "@/graphql/mutations/Relationship";

export default {
  name: "ProfileCard",
  props: {
    user: {
      required: true,
    },
  },
  computed: {
    ...mapState({
      me: (state) => state.auth.user,
    }),
  },
  methods: {
    addFriend() {
      let payload = {
        user_first_id: this.me.id,
        user_second_id: this.user.id,
        type: "FRIEND",
        status: "PENDING",
      };

      this.$apollo.mutate({
        mutation: CREATE_RELATIONSHIP,
        variables: {
          input: payload,
        },
      });
    },
  },
};
</script>

<style scoped></style>
