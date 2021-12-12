<template>
  <div>
    <post></post>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Post from "@/components/Post"
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
  components: {Post},
};
</script>
