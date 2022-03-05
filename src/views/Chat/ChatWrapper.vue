<template>
  <div class="chats">
    <v-menu
      :close-on-content-click="false"
      offset-y
      transition="expand-y-transition"
      :value="open"
      class="mr-6"
      top
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          v-on="on"
          fab
          dark
          large
          color="primary"
          @click="open = true"
        >
          <v-icon dark> mdi-message</v-icon>
        </v-btn>
      </template>

      <div class="chat">
        <chatbox
          v-if="chatting"
          :user="user"
          @close="open = false"
          @back="chatting = false"
        />
        <chat-users-list
          v-if="!chatting"
          @open-chat="openNewChat"
          :user="user"
        />
      </div>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ChatUsersList from "@/views/Chat/ChatUsersList";
import Chatbox from "@/views/Chat/Chatbox";

export default {
  name: "ChatWrapper",
  components: { Chatbox, ChatUsersList },
  computed: {
    ...mapState({
      chats: (state) => state.chat.chats,
    }),
  },
  data() {
    return {
      open: false,
      chatting: false,
      user: null,
    };
  },
  methods: {
    openNewChat(user) {
      this.user = user;
      this.chatting = true;
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/css/chat.scss";

.chat {
  width: 300px;
  height: 500px;
}

.chats {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0px 10px 10px 10px;
}
</style>
