<template>
  <apollo-query
    :query="query"
    :variables="{ username: $route.params.username }"
    :update="(data) => data.user"
    v-slot="{ result: { loading, error, data } }"
    style="width: 100%"
  >
    <div v-if="loading">LOUDING</div>
    <div v-if="error">
      Wystąpił nieoczekiwany błąd - spróbuj odświeżyć stronę
    </div>
    <posts :posts="data.posts" :loading="loading"></posts>
  </apollo-query>
</template>

<script>
import { GET_USER } from "@/graphql/queries/User";
import Posts from "@/components/Posts";

export default {
  name: "Account",
  components: { Posts },
  data() {
    return {
      query: GET_USER,
    };
  },
};
</script>

<style scoped></style>
