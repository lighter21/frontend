<template>
  <v-card
    :loading="$apolloGlobalLoading"
    rounded
    outlined
    dark
    color="#474b5c"
    class="mb-3"
    style="width: 100%"
  >
    <v-card-title>
      <span v-if="focused"> Utwórz post </span>
    </v-card-title>
    <v-card-text>
      <v-layout>
        <v-row no-gutters>
          <v-avatar class="mr-3">
            <v-img :loading="$apolloGlobalLoading" :src="user.parsed_avatar_path"></v-img>
          </v-avatar>
          <v-text-field
            dense
            :loading="$apolloGlobalLoading"
            outlined
            :placeholder="`O czym myślisz, ${user.first_name}?`"
            v-model="body"
          >
          </v-text-field>
        </v-row>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <file-upload-button v-model="file"> </file-upload-button>

      <div class="wrapper">
        <emoji-picker @emoji="insert" :search="search">
          <div
            class="emoji-invoker"
            slot="emoji-invoker"
            slot-scope="{ events: { click: clickEvent } }"
            @click.stop="clickEvent"
          >
            <v-icon> mdi-emoticon-outline </v-icon>
          </div>
          <div slot="emoji-picker" slot-scope="{ emojis, insert, display }">
            <div
              class="emoji-picker"
              :style="{ top: display.y + 'px', left: display.x - 250 + 'px' }"
            >
              <div>
                <div v-for="(emojiGroup, category) in emojis" :key="category">
                  <h5>{{ category }}</h5>
                  <div class="emojis">
                    <span
                      v-for="(emoji, emojiName) in emojiGroup"
                      :key="emojiName"
                      @click="insert(emoji)"
                      :title="emojiName"
                      >{{ emoji }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>
        </emoji-picker>
      </div>

      <v-divider vertical class="mr-4"></v-divider>

      <v-btn
        :loading="$apolloGlobalLoading"
        :disabled="body.length < 1"
        color="primary"
        dark
        @click="createPost"
      >
        Dodaj post
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
import FileUploadButton from "@/components/FileUploadButton";

export default {
  name: "CreatePost",
  components: { FileUploadButton },
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  data() {
    return {
      focused: true,
      body: "",
      loading: false,
      search: "",
      file: undefined,
    };
  },
  methods: {
    insert(emoji) {
      this.body += emoji;
    },

    createPost() {
      let input = {
        user_id: this.user.id,
        body: this.body,
      };

      this.$emit("create-post", { input: input, file: this.file });
      this.body = "";
      this.file = undefined
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  display: inline-block;
}

.regular-input {
  padding: 0.5rem 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  width: 20rem;
  height: 12rem;
  outline: none;
}

.regular-input:focus {
  box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.5);
}

.emoji-invoker {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  margin-right: 1rem;
  cursor: pointer;
  transition: all 0.2s;
}
.emoji-invoker:hover {
  transform: scale(1.1);
}
.emoji-invoker > svg {
  fill: #b1c6d0;
}

.emoji-picker {
  margin-top: 0.75rem;
  margin-right: 0.75rem;
  position: fixed;
  z-index: 1;
  font-family: Montserrat, serif;
  border: 1px solid #ccc;
  width: 15rem;
  height: 20rem;
  overflow-y: scroll;
  padding: 1rem;
  box-sizing: border-box;
  border-radius: 0.5rem;
  background: #fff;
  box-shadow: 1px 1px 8px #c7dbe6;
}
.emoji-picker__search {
  display: flex;
}
.emoji-picker__search > input {
  flex: 1;
  border-radius: 10rem;
  border: 1px solid #ccc;
  padding: 0.5rem 1rem;
  outline: none;
}
.emoji-picker h5 {
  margin-bottom: 0;
  color: #b1b1b1;
  text-transform: uppercase;
  font-size: 0.8rem;
  cursor: default;
}
.emoji-picker .emojis {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.emoji-picker .emojis:after {
  content: "";
  flex: auto;
}
.emoji-picker .emojis span {
  padding: 0.2rem;
  cursor: pointer;
  border-radius: 5px;
}
.emoji-picker .emojis span:hover {
  background: #ececec;
  cursor: pointer;
}
</style>
