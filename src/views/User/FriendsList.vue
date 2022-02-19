<template>
  <div>
    <v-row>
      <div
        v-if="friends.length === 0 && !$apolloGlobalLoading"
        class="my-6 text-h6 mx-auto"
      >
        Ten użytkownik nie ma żadnych znajomych.
      </div>
      <div v-if="$apolloGlobalLoading" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
      <ProfileCard
        v-for="friend in friends"
        :key="friend.id"
        :user="friend"
      ></ProfileCard>
    </v-row>
  </div>
</template>

<script>
import { GET_USERS_FRIENDS_LIST } from "@/graphql/queries/User";
import ProfileCard from "@/views/User/_ProfileCard";

export default {
  name: "FriendsList",
  components: { ProfileCard },
  apollo: {
    user: {
      query: GET_USERS_FRIENDS_LIST,
      variables() {
        return {
          username: this.$route.params.username,
        };
      },
      update: (data) => data.user.friends,
    },
  },
  data() {
    return {
      friends: [],
    };
  },
};
</script>

<style scoped></style>
