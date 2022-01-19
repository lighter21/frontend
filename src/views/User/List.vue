<template>
  <apollo-query
    :query="query"
    :update="(data) => data.users"
    style="width: 100%"
  >
    <!--    TODO: Filtrowanie wyników - znajomi ktorzy nie są w gronie zjanomych-->
    <template v-slot="{ result: { loading, error, data } }">
      <div v-if="loading">LOUDING</div>
      <div v-if="error">
        Wystąpił nieoczekiwany błąd - spróbuj odświeżyć stronę
      </div>
      <h3>Osoby, które możesz znać</h3>
      <v-col>
        <v-row>
          <div v-for="user in data" :key="user.id">
            <profile-card :user="user"> </profile-card>
          </div>
        </v-row>
      </v-col>
    </template>
  </apollo-query>
</template>

<script>
import { GET_USERS_LIST } from "@/graphql/queries/User";
import ProfileCard from "@/views/User/_ProfileCard";

export default {
  name: "List",
  components: { ProfileCard },
  data() {
    return {
      query: GET_USERS_LIST,
    };
  },
};
</script>

<style scoped></style>
