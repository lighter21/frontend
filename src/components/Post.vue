<template>
  <v-card
    class="my-3"
    rounded
    outlined
    dark
    color="#474b5c"
    :loading="$apolloGlobalLoading"
  >
    <v-list-item>
      <v-list-item-avatar>
        <v-img
          :src="post.user.avatar"
          :alt="post.user.first_name + ' ' + post.user.last_name"
        />
      </v-list-item-avatar>
      <v-list-item-content class="mt-2">
        <v-list-item-title class="subtitle">
          <router-link :to="`/user/${post.user.username}`" class="link">
            {{ post.user.first_name + " " + post.user.last_name }}
          </router-link>

          <span v-if="post.groups">
            <span v-for="group in post.groups" :key="group.id">
              <span class="caption"> &#10148; </span>
              <router-link :to="`/group/${group.id}`" class="link">
                {{ group.name }}
              </router-link>
            </span>
          </span>
        </v-list-item-title>
        <v-list-item-subtitle class="caption">
          <!--            {{ post.audience }}-->
          Publiczny
          {{ " · " + date }}
        </v-list-item-subtitle>
      </v-list-item-content>
      <v-list-item-action>
        <v-icon>more_horiz</v-icon>
      </v-list-item-action>
    </v-list-item>
    <v-divider></v-divider>
    <v-card-text>
      <div class="body1 mb-4">
        {{ post.body }}
      </div>
      <v-divider></v-divider>
      <v-layout class="py-2">
        <v-menu attach open-on-hover top offset-y min-width="200px">
          <template v-slot:activator="{ on }">
            <v-flex v-on="on" xs4>
              <v-layout>
                <v-avatar size="20" class="ml-1">
                  <v-img :src="like"></v-img>
                </v-avatar>
                <div class="ml-3" v-if="post.likes.length > 0">
                  + {{ post.likes.length }}
                </div>
              </v-layout>
            </v-flex>
          </template>
        </v-menu>
        <v-flex class="text-right">
          <v-layout wrap justify-end>
            <div class="mr-3 font-weight-bold">
              {{ post.comments.length + " komentarze" }}
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-divider></v-divider>
      <v-layout class="py-4">
        <v-row>
          <v-layout>
            <v-btn
              block
              elevation="0"
              color="transparent"
              class="white--text"
              @click="toggleLike"
            >
              <v-icon left dark :color="color"> mdi-thumb-up-outline</v-icon>
              <span v-if="!liked"> Lubię to!</span>
              <span v-if="liked" class="blue--text"> Lubię to!</span>
            </v-btn>
          </v-layout>

          <v-spacer></v-spacer>

          <v-layout>
            <v-btn
              block
              elevation="0"
              color="transparent"
              class="white--text"
              @click="showComments = !showComments"
            >
              <v-icon left dark> mdi-comment-outline</v-icon>
              Komentarze
            </v-btn>
          </v-layout>
        </v-row>
      </v-layout>
      <v-divider></v-divider>
    </v-card-text>
    <comments-section
      v-if="showComments"
      :comments="post.comments"
      :post-id="post.id"
    >
    </comments-section>
  </v-card>
</template>

<script>
import CommentsSection from "@/components/CommentsSection";
import like from "@/assets/like.svg";
import { mapState } from "vuex";
import { TOGGLE_LIKE } from "@/graphql/mutations/Post";
import moment from "moment";

export default {
  components: { CommentsSection },
  name: "Post",
  props: ["post"],
  computed: {
    ...mapState({
      me: (state) => state.auth.user,
    }),
    color: function () {
      if (this.liked) return "blue";
      return "white";
    },
  },
  data() {
    return {
      like: like,
      showComments: false,
      liked: false,
      date: null,
    };
  },
  methods: {
    toggleLike() {
      this.$apollo
        .mutate({
          mutation: TOGGLE_LIKE,
          variables: {
            post_id: this.post.id,
            user_id: this.me.id,
          },
        })
        .then(() => {
          this.liked = !this.liked;
        });
    },
    isLiked() {
      if (this.post) {
        return this.post.likes.some((item) => item.id == this.me.id);
      }
      return false;
    },
  },
  mounted() {
    this.liked = this.isLiked();
    this.date = moment(this.post.created_at).format("HH:MM DD-MM-YY");
  },
};
</script>

<style scoped>
.link {
  color: white;
  text-decoration: none;
}
.link:hover {
  color: lightblue;
}
</style>
