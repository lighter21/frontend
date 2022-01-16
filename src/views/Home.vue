<template>
  <v-col>
    <v-row>
      <create-post @create-post="createPost"></create-post>
    </v-row>
    <v-row>
      <apollo-query
        :query="query"
        :variables="{ user_id: user.id }"
        :update="(data) => data.timeline"
        v-slot="{ result: { loading, error, data } }"
        style="width: 100%"
      >
        <div v-if="loading">LOUDING</div>
        <div v-if="error">
          Wystąpił nieoczekiwany błąd - spróbuj odświeżyć stronę
        </div>
        <posts :posts="data" :loading="loading"></posts>
      </apollo-query>
    </v-row>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import Posts from "@/components/Posts";
import CreatePost from "@/components/CreatePost";
import { GET_TIMELINE } from "@/graphql/queries/Post";
import { CREATE_POST } from "@/graphql/mutations/Post";

export default {
  name: "Home",
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  components: { CreatePost, Posts },
  data() {
    return {
      query: GET_TIMELINE,
    };
  },
  methods: {
    createPost(input) {
      this.$apollo.mutate({
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
      });
    },
  },
};
</script>
