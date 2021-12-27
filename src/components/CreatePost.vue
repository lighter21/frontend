<template>
  <v-card
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
              src="https://randomuser.me/api/portraits/women/81.jpg"
            ></v-img>
          </v-avatar>
          <v-text-field
            dense
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
      <v-btn rounded color="primary" dark @click="createPost">
        Dodaj post
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { CREATE_POST } from "@/graphql/mutations/Post";
import { GET_TIMELINE } from "@/graphql/queries/Post";

export default {
  name: "CreatePost",

  computed: {
    ...mapState({
      error: (state) => state.auth.error,
      loading: (state) => state.auth.loading,
      isAuthenticated: (state) => state.auth.isAuthenticated,
      user: (state) => state.auth.user,
    }),
  },
  data() {
    return {
      focused: true,
      body: "",
    };
  },
  methods: {
    createPost() {
      let input = {
        user_id: this.user.id,
        body: this.body,
      };

      this.$apollo
        .mutate({
          mutation: CREATE_POST,
          variables: {
            input: input,
          },
          update: (store, { data: { createPost } }) => {
            const { timeline } = store.readQuery({
              query: GET_TIMELINE,
              variables: {
                user_id: this.user.id,
              },
            });
            store.writeQuery({
              query: GET_TIMELINE,
              data: {
                timeline: [createPost, ...timeline],
              },
              variables: {
                user_id: this.user.id,
              },
            });
          },
        })
        .then(() => {
          this.body = "";
        });
    },
  },
};
</script>

<style scoped></style>
