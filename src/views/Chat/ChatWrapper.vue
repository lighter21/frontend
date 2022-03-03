<template>
  <div class="text-center chats">
    <v-menu
      :close-on-content-click="false"
      offset-y
      transition="expand-y-transition"
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
        >
          <v-icon dark> mdi-message </v-icon>
        </v-btn>
      </template>
      <v-card dark width="300" height="350" >
        <v-card-title>
          Czaty
        </v-card-title>

        <v-card-text>
          <chat-users-list />
        </v-card-text>
      </v-card>



    </v-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ChatUsersList from "@/views/Chat/ChatUsersList";

export default {
  name: "ChatWrapper",
  components: {ChatUsersList},
  computed: {
    ...mapState({
      chats: (state) => state.chat.chats,
    }),
  },
  methods: {
    openNewChat() {
      console.log('asd')
    }
  }
};
</script>

<style scoped>
.chats {
  position: fixed;
  bottom: 0;
  right: 0;
  margin: 0px 10px 10px 10px;
}
</style>
