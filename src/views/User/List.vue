<template>
  <div>
    <h3>Osoby, które możesz znać</h3>
    <div v-if="$apolloGlobalLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <v-col>
      <v-row>
        <div v-for="user in suggestedFriends" :key="user.id">
          <profile-card :user="user"></profile-card>
        </div>
      </v-row>
    </v-col>
  </div>
</template>

<script>
import { GET_USER_SUGGESTED_FRIENDS } from "@/graphql/queries/User";
import ProfileCard from "@/views/User/_ProfileCard";
import { mapState } from "vuex";

export default {
  name: "List",
  components: { ProfileCard },
  apollo: {
    suggestedFriends: {
      query: GET_USER_SUGGESTED_FRIENDS,
      variables() {
        return {
          user_id: this.user.id,
        };
      },
      update: (data) => data.suggestedFriends,
    },
  },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  data() {
    return {
      suggestedFriends: [],
    };
  },
};
</script>

<style scoped></style>
