<template>
  <v-col>
    <v-row>
      <create-post></create-post>
    </v-row>
    <v-row>
      <post :posts="timeline"></post>
    </v-row>
  </v-col>
</template>

<script>
import { mapState } from "vuex";
import Post from "@/components/Post";
import CreatePost from "@/components/CreatePost";
import { GET_TIMELINE } from "@/graphql/queries/Post";

export default {
  name: "Home",
  computed: {
    ...mapState({
      error: (state) => state.auth.error,
      loading: (state) => state.auth.loading,
      isAuthenticated: (state) => state.auth.isAuthenticated,
      user: (state) => state.auth.user,
    }),
  },
  components: { CreatePost, Post },
  apollo: {
    timeline: {
      query: GET_TIMELINE,
      variables() {
        return {
          user_id: this.user.id,
        };
      },
      fetchPolicy: "cache-and-network",
      update(data) {
        console.log(data, "mutacja");
        return data.timeline;
      },
    },
  },
  data() {
    return {
      timeline: [],
    };
  },
};
</script>
