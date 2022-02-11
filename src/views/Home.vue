<template>
  <v-col>
    <v-row>
      <create-post @create-post="createPost"></create-post>
    </v-row>
    <posts-section :posts="timeline"></posts-section>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import CreatePost from "@/components/CreatePost";
import { GET_TIMELINE } from "@/graphql/queries/Post";
import { CREATE_POST } from "@/graphql/mutations/Post";
import PostsSection from "@/components/PostsSection";

export default {
  name: "Home",
  apollo: {
    timeline: {
      query: GET_TIMELINE,
      variables() {
        return {
          user_id: this.user.id,
        };
      },
      update: (data) => data.timeline,
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  components: { PostsSection, CreatePost },
  data() {
    return {
      query: GET_TIMELINE,
      timeline: [],
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
