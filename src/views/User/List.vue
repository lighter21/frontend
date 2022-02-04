<template>
  <div>
<!--    <div v-if="error">-->
<!--      Wystąpił nieoczekiwany błąd - spróbuj odświeżyć stronę-->
<!--    </div>-->
    <h3>Osoby, które możesz znać</h3>
    <div v-if="$apolloGlobalLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-col>
      <v-row>
        <div v-for="user in users" :key="user.id">
          <profile-card :user="user"></profile-card>
        </div>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { GET_USERS_LIST } from "@/graphql/queries/User";
import ProfileCard from "@/views/User/_ProfileCard";

export default {
  name: "List",
  components: { ProfileCard },
  apollo: {
    users: {
      query: GET_USERS_LIST,
      update: (data) => data.users,
    },
  },
  data() {
    return {
      users: [],
    };
  },
};
</script>

<style scoped></style>
