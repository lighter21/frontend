<template>
  <div>
    <div class="text-center ma-4 text-h6" v-if="posts.length === 0 && !$apolloGlobalLoading">
      Nie dodano jeszcze żadnych postów.
    </div>
    <v-progress-circular
      v-if="$apolloGlobalLoading"
      style="width: 100%"
      class="my-3"
      indeterminate
      color="primary"
    ></v-progress-circular>

    <div v-for="post in posts" :key="post.id">
      <post :post="post"></post>
    </div>
  </div>
</template>

<script>
import like from "@/assets/like.svg";
import Post from "@/components/Post";

export default {
  name: "PostsSection",
  components: { Post },
  props: ["posts"],
  data() {
    return {
      like: like,
      showComments: false,
    };
  },
  methods: {
    toggleLike() {},
  },
};
</script>

<style scoped></style>
