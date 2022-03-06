<template>
  <v-layout column justify-center class="mb-6">
    <v-img
      class="rounded-lg"
      src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
      max-height="300px"
    >
    </v-img>
    <v-row>
      <v-avatar size="200" class="profile-img">
        <img
          :loading="$apolloGlobalLoading"
          :src="user.parsed_avatar_path"
          alt="John"
        />
      </v-avatar>
      <v-row class="justify-space-between my-6 mx-4">
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
        <div class="actions" v-if="!isMyAccount && !isAlreadyFriend">
          <v-btn
            color="primary"
            :loading="$apolloGlobalLoading"
            small
            v-if="!isAlreadyInvited"
            @click="addToFriendsList"
          >
            Dodaj Znajomego
          </v-btn>

          <v-btn
            color="primary"
            :loading="$apolloGlobalLoading"
            small
            v-if="isAlreadyInvited"
            @click="cancelInvitation"
          >
            Anuluj zaproszenie
          </v-btn>
        </div>
      </v-row>
    </v-row>
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
  margin-top: -70px;
  margin-left: 30%;
  border: #cbd5e0 4px solid;
}

.actions {
  justify-self: end;
  justify-content: end;
  justify-items: end;
}
</style>
