<template>
  <div>
    <v-container fluid>
      <profile-heading-section :user="user"></profile-heading-section>
    </v-container>
    <v-tabs v-model="tab" centered background-color="#282b35" dark>
      <v-tabs-slider v-model="tab" color="primary"></v-tabs-slider>

      <v-tab :to="getTabRouteObject('activity')"> Aktywność </v-tab>

      <v-tab :to="getTabRouteObject('photos')"> Zdjęcia </v-tab>

      <v-tab :to="getTabRouteObject('friends')"> Znajomi </v-tab>
    </v-tabs>

    <v-tabs-items v-model="tab" class="transparent">
      <v-tab-item :value="getTabRoutePath('activity')">
        <create-post
          class="mt-3"
          v-if="isMyAccount(user)"
          @create-post="createPost"
        ></create-post>
        <div v-if="$apolloGlobalLoading" class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
        </div>
        <posts-section :posts="user.posts"></posts-section>
      </v-tab-item>
      <v-tab-item :value="getTabRoutePath('photos')">
        <images-gallery class="mt-3"></images-gallery>
      </v-tab-item>
      <v-tab-item :value="getTabRoutePath('friends')">
        <friends-list></friends-list>
      </v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import { GET_USER } from "@/graphql/queries/User";
import { mapState } from "vuex";
import CreatePost from "@/components/CreatePost";
import { CREATE_POST } from "@/graphql/mutations/Post";
import { UPDATE_OR_CREATE_FRIEND } from "@/graphql/mutations/User";
import { StatusType } from "../../../enums/StatusType";
import { CHECK_AUTH } from "@/store/mutations.type";
import PostsSection from "@/components/PostsSection";
import ImagesGallery from "@/views/User/ImagesGallery";
import FriendsList from "@/views/User/FriendsList";
import ProfileHeadingSection from "@/views/User/_ProfileHeadingSection";

export default {
  name: "Show",
  components: {ProfileHeadingSection, FriendsList, ImagesGallery, PostsSection, CreatePost },
  apollo: {
    user: {
      query: GET_USER,
      variables() {
        return {
          username: this.$route.params.username,
        };
      },
      update: (data) => data.user,
    },
  },
  computed: {
    ...mapState({
      me: (state) => state.auth.user,
    }),
    isAlreadyInvited: function () {
      return this.me.send_invitations.some((item) => item.id == this.user.id);
    },
  },
  data() {
    return {
      user: {},
      tab: "null",
    };
  },
  methods: {
    isMyAccount() {
      return this.user.id == this.me.id;
    },
    getTabRouteObject(tabName) {
      return {
        name: "User.Tab",
        params: {
          tab: tabName,
        },
      };
    },

    getTabRoutePath(tabName) {
      let routeObject = this.getTabRouteObject(tabName);
      let location = this.$router.resolve(routeObject);
      return location.href;
    },
    showUserImages() {
      this.$router.push({
        name: "User.Tab",
        params: { username: this.user.username },
      });
    },
    createPost(input) {
      this.$apollo.mutate({
        mutation: CREATE_POST,
        variables: {
          input: input,
        },
        update: (store, { data: { createPost } }) => {
          const { user } = store.readQuery({
            query: GET_USER,
            variables: {
              username: this.$route.params.username,
            },
          });
          const userCopy = Object.assign({}, user);
          userCopy.posts = [createPost, ...user.posts];
          store.writeQuery({
            query: GET_USER,
            data: {
              user: userCopy,
            },
            variables: {
              username: this.$route.params.username,
            },
          });
        },
      });
    },

    getUserFullName() {
      return `${this.user.first_name} ${
        this.user.second_name ? this.user.second_name : ""
      } ${this.user.last_name}`;
    },

  },
};
</script>

<style scoped></style>
