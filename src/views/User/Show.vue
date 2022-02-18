<template>
  <!--      <div v-if="error">-->
  <!--        Wystąpił nieoczekiwany błąd - spróbuj odświeżyć stronę-->
  <!--      </div>-->
  <div>
    <v-container>
      <v-col lg="6" md="8" sm="12" align-self="center" class="mx-auto">
        <v-row>
          <v-avatar size="200" color="primary" class="fill-height my-auto">
            <img
                :loading="$apolloGlobalLoading"
                :src="user.avatar"
                alt="John"
            />
          </v-avatar>

          <v-col class="mx-6" align-self="center">
            <v-row justify="space-between">
              <p class="title">
                {{ getUserFullName() }}
              </p>
              <v-btn
                color="primary"
                :loading="$apolloGlobalLoading"
                small
                v-if="!isMyAccount() && !isAlreadyInvited"
                @click="addToFriendsList"
              >
                Dodaj Znajomego
              </v-btn>

              <v-btn
                color="primary"
                :loading="$apolloGlobalLoading"
                small
                v-if="!isMyAccount() && isAlreadyInvited"
                @click="cancelInvitation"
              >
                Anuluj zaproszenie
              </v-btn>
            </v-row>

            <v-row class="my-3">
              <div class="subtitle-1" v-if="!$apolloGlobalLoading">
                {{ user.posts.length }} postów
              </div>
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
      v-if="isMyAccount(user)"
      @create-post="createPost"
    ></create-post>
    <div v-if="$apolloGlobalLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>
    <posts-section :posts="user.posts"></posts-section>
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

export default {
  name: "Show",
  components: {PostsSection, CreatePost },
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
    addToFriendsList() {
      this.$apollo
        .mutate({
          mutation: UPDATE_OR_CREATE_FRIEND,
          variables: {
            id: this.me.id,
            friend_id: this.user.id,
            status: StatusType.Pending.status,
          },
        })
        .then(() => {
          this.$store.dispatch(CHECK_AUTH);
        });
    },
    cancelInvitation() {
      this.$apollo
        .mutate({
          mutation: UPDATE_OR_CREATE_FRIEND,
          variables: {
            id: this.me.id,
            friend_id: this.user.id,
            status: StatusType.Canceled.status,
          },
        })
        .then(() => {
          this.$store.dispatch(CHECK_AUTH);
        });
    },
    getUserFullName() {
      return `${this.user.first_name} ${
        this.user.second_name ? this.user.second_name : ""
      } ${this.user.last_name}`;
    },
    isMyAccount() {
      return this.user.id == this.me.id;
    },
  },
};
</script>

<style scoped></style>
