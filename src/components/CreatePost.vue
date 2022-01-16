<template>
  <v-card
      :loading="loading"
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
                :loading="$apollo.loading"
                src="https://randomuser.me/api/portraits/women/81.jpg"
            ></v-img>
          </v-avatar>
          <v-text-field
              dense
              :loading="$apollo.loading"
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
          :loading="$apollo.loading"
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
import {mapState} from "vuex";

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

      this.$emit('create-post', input)
      this.body = ""
      // this.$apollo
      //   .mutate({
      //     mutation: CREATE_POST,
      //     variables: {
      //       input: input,
      //     },
      //     update: (store, { data: { createPost } }) => {
      //       const { timeline } = store.readQuery({
      //         query: GET_TIMELINE,
      //         variables: {
      //           user_id: this.user.id,
      //         },
      //       });
      //       store.writeQuery({
      //         query: GET_TIMELINE,
      //         data: {
      //           timeline: [createPost, ...timeline],
      //         },
      //         variables: {
      //           user_id: this.user.id,
      //         },
      //       });
      //     },
      //   })
      //   .then(() => {
      //     this.loading = false;
      //     this.body = "";
      //   });
    },
  },
};
</script>

<style scoped></style>
