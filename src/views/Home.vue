<template>
  <h1>Home page</h1>
</template>

<script>
import {mapState} from "vuex";

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
  components: {},
};
</script>
