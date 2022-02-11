<template>
  <apollo-query
    :query="query"
    :variables="{ id: $route.params.groupId }"
    :update="(data) => data.group"
    fetch-policy="network-only"
    style="width: 100%"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <div v-if="loading">LOUDING</div>
      <div v-if="error">
        Wystąpił nieoczekiwany błąd - spróbuj odświeżyć stronę
      </div>

      <v-container>
        <v-col cols="12">
          <v-row>
            <v-img
              class="rounded-lg"
              src="https://images.pexels.com/photos/1563356/pexels-photo-1563356.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
              max-height="300px"
            >
            </v-img>
          </v-row>
          <v-row class="my-3">
            <v-col>
              <v-row no-gutters justify="space-between">
                <span class="display-1 d-block">{{ data.name }}</span>
                <v-btn color="success" @click="joinGroup" :loading="loading">
                  <v-icon> mdi-plus</v-icon>
                  Dołącz
                </v-btn>
              </v-row>
              <span class="caption ma-0 d-block grey--text">
                {{
                  groupPrivacyPolicyBindings[data.privacy] +
                  " · " +
                  data.created_at
                }}
              </span>
              <p></p>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
      <create-post @create-post="createPost"></create-post>
      <posts-section :posts="data.posts" :loading="loading"></posts-section>
    </template>
  </apollo-query>
</template>

<script>
import { GET_GROUP } from "@/graphql/queries/Group";
import CreatePost from "@/components/CreatePost";
import { CREATE_POST } from "@/graphql/mutations/Post";
import { ATTACH_POST_TO_GROUP } from "@/graphql/mutations/Group";
import PostsSection from "@/components/PostsSection";

export default {
  name: "Show",
  components: { PostsSection, CreatePost },
  data() {
    return {
      query: GET_GROUP,
      groupPrivacyPolicyBindings: {
        PUBLIC: "Grupa Publiczna",
        PRIVATE: "Grupa Prywatna",
      },
    };
  },
  methods: {
    createPost(input) {
      this.$apollo
        .mutate({
          mutation: CREATE_POST,
          variables: {
            input: input,
          },
          update: (store, { data: { createPost } }) => {
            const { group } = store.readQuery({
              query: GET_GROUP,
              variables: {
                id: this.$route.params.groupId,
              },
            });
            const groupCopy = Object.assign({}, group);
            groupCopy.posts = [createPost, ...group.posts];
            store.writeQuery({
              query: GET_GROUP,
              data: {
                group: groupCopy,
              },
              variables: {
                id: this.$route.params.groupId,
              },
            });
          },
        })
        .then((res) => this.attachPostToGroup(res.data.createPost));
    },

    joinGroup() {
      return true;
    },
    attachPostToGroup(post) {
      this.$apollo.mutate({
        mutation: ATTACH_POST_TO_GROUP,
        variables: {
          post_id: parseInt(post.id),
          group_id: parseInt(this.$route.params.groupId),
        },
      });
    },
  },
};
</script>

<style scoped></style>
