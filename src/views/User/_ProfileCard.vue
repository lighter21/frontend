<template>
  <v-card
    dark
    color="#474b5c"
    :loading="$apollo.loading"
    class="ma-2"
    width="250"
    height="370"
  >
    <template slot="progress">
      <v-progress-linear
        color="deep-purple"
        height="10"
        indeterminate
      ></v-progress-linear>
    </template>

    <v-img height="200" :src="user.parsed_avatar_path"></v-img>

    <v-card-title class="text-h6"
      >{{ user.first_name + " " + user.last_name }}
    </v-card-title>
    <v-card-actions>
      <v-col>
        <v-btn
          color="primary"
          class="mb-2 mt-n4"
          block
          v-if="!showingFriends"
          @click="sendFriendsInvitation"
          :disabled="isAlreadyInvited"
        >
          Dodaj do znajomych
        </v-btn>
        <v-btn color="" block :to="`/user/${user.username}`"
          >Zobacz profil</v-btn
        >
      </v-col>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import { StatusType } from "../../../enums/StatusType";
import { UPDATE_OR_CREATE_FRIEND } from "@/graphql/mutations/User";

export default {
  name: "ProfileCard",
  props: {
    user: {
      required: true,
    },
    showingFriends: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    ...mapState({
      me: (state) => state.auth.user,
    }),
    isAlreadyInvited: function () {
      return this.me.send_invitations.some((item) => item.id == this.user.id);
    },
    isAlreadyFriend: function () {
      return this.me.friends.some((item) => item.id == this.user.id);
    },
    isMyAccount: function () {
      return this.user.id == this.me.id;
    },
  },
  methods: {
    sendFriendsInvitation() {
      this.$apollo.mutate({
        mutation: UPDATE_OR_CREATE_FRIEND,
        variables: {
          id: this.me.id,
          friend_id: this.user.id,
          status: StatusType.Pending.status,
        },
      });
    },
  },
};
</script>

<style scoped></style>
