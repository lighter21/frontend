<template>
  <v-layout column justify-center class="mb-6">
    <v-img
      v-if="user.background"
      class="rounded-lg"
      :src="user.parsed_background_path"
      max-height="300px"
    />
    <div v-else class="background-gradient rounded-lg" />

    <v-row
      class="my-2 justify-end"
      no-gutters
      v-if="!isMyAccount && !isAlreadyFriend"
    >
      <v-btn
        color="primary"
        :loading="$apolloGlobalLoading"
        small
        v-if="!isAlreadyInvited"
        @click="addToFriendsList"
      >
        <v-icon>
          mdi-account-plus-outline
        </v-icon>
        Dodaj Znajomego
      </v-btn>

      <v-btn
        color="error"
        :loading="$apolloGlobalLoading"
        small
        v-if="isAlreadyInvited"
        @click="cancelInvitation"
      >
        <v-icon>
          mdi-account-remove-outline
        </v-icon>
        Anuluj zaproszenie
      </v-btn>
    </v-row>

    <div class="">
      <v-row justify="center">
        <v-avatar size="200" class="profile-img">
          <v-img
            :loading="$apolloGlobalLoading"
            :src="user.parsed_avatar_path"
            alt="John"
          />
        </v-avatar>
      </v-row>

      <div class="">
        <div class="flex-column">
          <span
            class="title d-block text-center"
            v-text="user.first_name + ' ' + user.last_name"
          />
          <span
            class="caption d-block text-center"
            v-text="'Dołączył: ' + date"
          />

          <v-row class="caption justify-center pa-3">
            <span class="d-block">
              <v-icon x-small dark> mdi-account </v-icon>
              {{ user.friends_count }}
            </span>
            <div class="mx-2"></div>
            <span class="d-block">
              <v-icon x-small dark> mdi-post-outline </v-icon>
              {{ user.posts.length }}
            </span>
          </v-row>
        </div>
      </div>
    </div>
  </v-layout>
</template>

<script>
import moment from "moment";
import { mapState } from "vuex";
import { UPDATE_OR_CREATE_FRIEND } from "@/graphql/mutations/User";
import { StatusType } from "../../../enums/StatusType";
import { CHECK_AUTH } from "@/store/mutations.type";

export default {
  name: "ProfileHeadingSection",
  props: ["user"],
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
  data: () => ({
    date: null,
  }),
  methods: {
    addToFriendsList() {
      this.$apollo
        .mutate({
          mutation: UPDATE_OR_CREATE_FRIEND,
          variables: {
            id: this.me.id,
            friend_id: this.user.id,
            status: StatusType.Pending.status,
          },
        })
        .then(() => {
          this.$store.dispatch(CHECK_AUTH);
        });
    },
    cancelInvitation() {
      this.$apollo
        .mutate({
          mutation: UPDATE_OR_CREATE_FRIEND,
          variables: {
            id: this.me.id,
            friend_id: this.user.id,
            status: StatusType.Canceled.status,
          },
        })
        .then(() => {
          this.$store.dispatch(CHECK_AUTH);
        });
    },
  },
  mounted() {
    this.date = moment(this.user.created_at).format("DD.MM.YYYY");
  },
};
</script>

<style lang="scss" scoped>
.profile-img {
  margin-top: -100px;
  border: #cbd5e0 4px solid;
  margin-bottom: 1.5rem;
}

.background-gradient {
  height: 350px;
  width: 100%;
  background: rgb(10, 10, 17);
  background: linear-gradient(
    90deg,
    rgba(10, 10, 17, 1) 15%,
    rgba(42, 43, 45, 1) 47%,
    rgba(10, 10, 17, 1) 85%
  );
}
</style>
