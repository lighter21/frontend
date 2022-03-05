<template>
  <v-col>
    <create-post @create-post="submit"></create-post>
    <posts-section :posts="timeline"></posts-section>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import CreatePost from "@/components/CreatePost";
import { GET_TIMELINE } from "@/graphql/queries/Post";
import { CREATE_POST } from "@/graphql/mutations/Post";
import PostsSection from "@/components/PostsSection";
import { uploadImage } from "@/graphql/mutations/Image";

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
      update: (data) => data.Timeline,
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
    submit(payload) {
      this.createPost(payload.input).then((res) => {
        if (payload.file) {
          uploadImage(res.id, "App\\Models\\Post", payload.file);
          this.$apollo.queries.Timeline.refetch();
        }
      });
    },

    createPost(post) {
      return this.$apollo
        .mutate({
          mutation: CREATE_POST,
          variables: {
            input: post,
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
        .then(({ data }) => {
          return data.createPost;
        });
    },
  },
  mounted() {
    this.$apollo.queries.timeline.refetch();
  },
};
</script>
