<template>
  <div class="">
    <div class="contact bar">
      <v-icon large class="pic"> mdi-menu </v-icon>
      <div class="name">Chaty</div>
    </div>
    <v-list subheader>
      <v-list-item
        v-for="user in user.friends"
        :key="user.id"
        @click="openChat(user)"
      >
        <v-list-item-avatar>
          <v-img
            :alt="`${user.name} avatar`"
            :src="user.parsed_avatar_path"
          ></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title
            v-text="user.first_name + ' ' + user.last_name"
          ></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </div>
</template>

<script>
import { GET_USERS_FRIENDS_LIST } from "@/graphql/queries/User";
import { mapMutations, mapState } from "vuex";

export default {
  name: "ChatUsersList",
  apollo: {
    user: {
      query: GET_USERS_FRIENDS_LIST,
      variables() {
        return {
          username: this.me.username,
        };
      },
      update: (data) => data.user,
    },
  },
  data() {
    return {
      selectedUser: null,
      user: null,
    };
  },
  computed: {
    ...mapState({
      me: (state) => state.auth.user,
    }),
  },
  methods: {
    openChat(user) {
      this.$emit("open-chat", user);
    },
  },
};
</script>

<style scoped></style>
