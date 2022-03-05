<template>
  <div class="chat">
    <div class="close">
      <v-btn icon @click="$emit('back')">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-btn icon @click="$emit('close')">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </div>

    <div class="contact bar">
      <div class="pic">
        <v-avatar size="48">
          <v-img :src="user.parsed_avatar_path" />
        </v-avatar>
      </div>
      <div class="name" v-text="user.first_name + ' ' + user.last_name"></div>
    </div>
    <div class="messages" id="chat">
      <div
        class="message"
        v-for="(item, index) in messages"
        :key="index"
        :class="belongsToMe(item.username) ? 'message-right' : 'message-left'"
        v-text="item.body"
      ></div>
    </div>
    <div class="input">
      <input
        placeholder="Aa"
        type="text"
        v-model="message"
        @keypress.enter="sendMessage"
      />
      <v-btn icon @click="sendMessage">
        <v-icon class="close"> mdi-send </v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import moment from "moment";

export default {
  name: "Chatbox",
  props: ["user"],
  data: () => ({
    db: null,
    message: "",
    conversation: null,
    subscription: null,
    messages: [],
  }),
  computed: {
    ...mapState({
      me: (state) => state.auth.user,
    }),
  },
  methods: {
    belongsToMe(username) {
      return username === this.me.username;
    },
    async createNewConversation() {
      let conversation = {
        messages: [],
        users: [this.me.username, this.user.username],
      };

      this.conversation = await addDoc(
        collection(this.db, "conversations"),
        conversation
      );
    },

    async getConversation() {
      const itemsRef = collection(this.db, "conversations");
      const q = query(
        itemsRef,
        where("users", "array-contains-any", [
          this.user.username,
          this.me.username,
        ])
      );

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("query snapshot empty");
        await this.createNewConversation();
      } else {
        querySnapshot.forEach((doc) => {
          this.getConversationDoc(doc.id);
        });
      }
    },
    async sendMessage() {
      if (this.message === "") return;

      const message = {
        body: this.message,
        username: this.me.username,
        created: moment.now(),
      };

      await updateDoc(this.conversation, {
        messages: [...this.messages, message],
      });
      this.message = "";
      this.scrollDown();
    },

    async getConversationDoc(id) {
      let docRef = doc(this.db, "conversations", id);
      this.conversation = docRef;

      let data = await getDoc(docRef);
      this.subscription = await onSnapshot(docRef, (doc) => {
        this.messages = [];
        let data = doc.data();
        data.messages.forEach((message) => this.messages.push(message));
        setTimeout(this.scrollDown, 100);

      });

    },
    scrollDown() {
      var chat = document.getElementById("chat");
      chat.scrollTop = chat.scrollHeight;
    },
  },
  mounted() {
    this.db = getFirestore();
    this.getConversation();
    this.scrollDown()
  },
  // beforeDestroy() {
  //   this.subscription();
  // },
};
</script>
