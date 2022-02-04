<template>
  <v-card
    :loading="$apolloGlobalLoading"
    rounded
    outlined
    dark
    color="#474b5c"
    class="mb-3"
    style="width: 100%"
  >
    <v-card-title>
      <span v-if="focused"> Utwórz post </span>
    </v-card-title>
    <v-card-text>
      <v-layout>
        <v-row no-gutters>
          <v-avatar class="mr-3">
            <v-img
              :loading="$apolloGlobalLoading"
              src="https://randomuser.me/api/portraits/women/81.jpg"
            ></v-img>
          </v-avatar>
          <v-text-field
            dense
            :loading="$apolloGlobalLoading"
            outlined
            placeholder="O czym myślisz, Bartosz?"
            v-model="body"
          >
          </v-text-field>
        </v-row>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        :loading="$apolloGlobalLoading"
        :disabled="body.length < 1"
        rounded
        color="primary"
        dark
        @click="createPost"
      >
        Dodaj post
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "CreatePost",

  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  data() {
    return {
      focused: true,
      body: "",
      loading: false,
    };
  },
  methods: {
    createPost() {
      let input = {
        user_id: this.user.id,
        body: this.body,
      };

      this.$emit("create-post", input);
      this.body = "";
    },
  },
};
</script>

<style scoped></style>
