<template>
  <apollo-query
    :query="query"
    :variables="{ username: $route.params.username }"
    :update="(data) => data.user"
    style="width: 100%"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <div v-if="loading">LOUDING</div>
      <div v-if="error">
        Wystąpił nieoczekiwany błąd - spróbuj odświeżyć stronę
      </div>

      <v-container>
        <v-col lg="6" md="8" sm="12" align-self="center" class="mx-auto">
          <v-row>
            <v-avatar size="200" color="primary" class="fill-height my-auto">
              <img
                :loading="loading"
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              />
            </v-avatar>
            <v-col class="mx-6" align-self="center">
              <v-row justify="space-between">
                <p class="title">
                  {{ getUserFullName(data) }}
                </p>
                <v-btn color="primary" small v-if="!isMyAccount(data)">
                  Dodaj Znajomego
                </v-btn>
              </v-row>

              <v-row class="my-3">
                <div class="subtitle-1">{{ data.posts.length }} postów</div>
                <div class="mx-4 subtitle-1">88 Znajomych</div>
                <div class="subtitle-1">7 Zdjęć</div>
              </v-row>
              <v-row class="subtitle-2">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Blanditiis et inventore maiores praesentium quidem recusandae
                reiciendis, repellendus. Consectetur eligendi error esse facilis
                nobis nulla, officiis quibusdam quo sed suscipit vitae!
              </v-row>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
      <create-post
        v-if="isMyAccount(data)"
        @create-post="createPost"
      ></create-post>
      <posts :posts="data.posts" :loading="loading"></posts>
    </template>
  </apollo-query>
</template>

<script>
import { GET_USER } from "@/graphql/queries/User";
import Posts from "@/components/Posts";
import { mapState } from "vuex";
import CreatePost from "@/components/CreatePost";
import { CREATE_POST } from "@/graphql/mutations/Post";

export default {
  name: "Show",
  components: { CreatePost, Posts },
  computed: {
    ...mapState({
      me: (state) => state.auth.user,
    }),
  },
  data() {
    return {
      query: GET_USER,
    };
  },
  methods: {
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
    getUserFullName(user) {
      return `${user.first_name} ${user.second_name ? user.second_name : ""} ${
        user.last_name
      }`;
    },
    isMyAccount(user) {
      return user.id !== this.me.id;
    },
  },
};
</script>

<style scoped></style>
