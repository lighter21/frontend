<template>
  <v-card class="chat">
    <v-card-title> Czat z debilem</v-card-title>
    <v-card-text>
      <v-col>
        <div v-for="(item, index) in messages" :key="index">
          {{ item.body }}
        </div>
      </v-col>
    </v-card-text>
    <v-card-actions>
      <v-text-field v-model="message">
        <template v-slot:append>
          <v-btn icon @click="sendMessage" @keyup.enter="sendMessage">
            <v-icon> mdi-send</v-icon>
          </v-btn>
        </template>
      </v-text-field>
    </v-card-actions>
  </v-card>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import {
  collection,
  onSnapshot,
  getDocs,
  getDoc,
  doc,
  getFirestore,
  query,
  where,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { mapState } from "vuex";

export default {
  name: "ChatWindow",
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
          console.log(doc)
          this.getConversationDoc(doc.id);
        });
      }
    },
    sendMessage() {
      const message = {
        body: this.message,
        username: this.me.username,
      };

      updateDoc(this.conversation, {
        messages: [message, ...this.messages],
      });
      this.message = ""
    },

    async getConversationDoc(id) {
      console.log(id)
      let docRef = doc(this.db, "conversations", id);
      this.conversation = docRef;

      let data = await getDoc(docRef);
      this.subscription = onSnapshot(docRef, (doc) => {
        this.messages = []
        let data = doc.data();
        data.messages.forEach((message) => this.messages.push(message));
      });
    },
  },
  mounted() {
    this.db = getFirestore();
    this.getConversation();
  },
  beforeDestroy() {
    this.subscription()
  },

};
</script>

<style scoped>

</style>
