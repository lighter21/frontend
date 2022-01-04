<template>
  <div>
    <div class="px-4">
      <v-text-field
        dark
        outlined
        placeholder="Napisz komentarz..."
        dense
        v-model="body"
        :loading="$apollo.loading"
        @keypress.enter="addComment"
      ></v-text-field>
    </div>
    <div v-for="comment in commentsList" :key="comment.id">
      <comment :comment="comment"></comment>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { CREATE_COMMENT } from "@/graphql/mutations/Comment";
import Comment from "@/components/Comment";

export default {
  components: { Comment },
  props: ["comments", "postId"],
  name: "CommentsSection",
  data() {
    return {
      body: "",
      commentsList: null,
    };
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    addComment() {
      let input = {
        user_id: this.user.id,
        post_id: parseInt(this.postId),
        body: this.body,
      };

      this.$apollo
        .mutate({
          mutation: CREATE_COMMENT,
          variables: {
            input: input,
          },
          // eslint-disable-next-line no-unused-vars
          update: (store, { data: { createComment } }) => {
            this.commentsList = [...this.commentsList, createComment];
          },
        })
        .then(() => {
          this.body = "";
        });
    },
  },
  mounted() {
    this.commentsList = this.comments;
  },
};
</script>

<style scoped></style>
