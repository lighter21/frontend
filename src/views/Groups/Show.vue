<template>
  <div>
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
              <span class="display-1 d-block">{{ group.name }}</span>
              <v-btn
                color="success"
                @click="toggleGroupMembership"
                :loading="$apolloGlobalLoading"
                v-if="!isMemberOfGroup"
              >
                <v-icon> mdi-plus</v-icon>
                Dołącz
              </v-btn>

              <v-btn
                v-if="isMemberOfGroup"
                color="error"
                @click="toggleGroupMembership"
                :loading="$apolloGlobalLoading"
              >
                <v-icon> mdi-compare-remove</v-icon>
                Opuść grupę
              </v-btn>
            </v-row>
            <span class="caption ma-0 d-block grey--text">
              {{
                groupPrivacyPolicyBindings[group.privacy] +
                " · Założono: " +
                date
              }}
            </span>
            <p></p>
          </v-col>
        </v-row>
      </v-col>
    </v-container>
    <create-post @create-post="createPost" v-if="isMemberOfGroup"></create-post>
    <posts-section
      v-if="isAbleToSeePosts"
      :posts="group.posts"
      :loading="$apolloGlobalLoading"
    ></posts-section>
    <div v-if="!isAbleToSeePosts" class="text-center ma-4 text-h6">
      Aby zobaczyć posty, musisz być członkiem grupy.
    </div>
  </div>
</template>

<script>
import { GET_GROUP } from "@/graphql/queries/Group";
import CreatePost from "@/components/CreatePost";
import { CREATE_POST } from "@/graphql/mutations/Post";
import PostsSection from "@/components/PostsSection";
import { TOGGLE_MEMBERSHIP } from "@/graphql/mutations/Group";
import { mapState } from "vuex";
import moment from "moment";

export default {
  name: "Show",
  components: { PostsSection, CreatePost },
  apollo: {
    group: {
      query: GET_GROUP,
      variables() {
        return {
          id: this.$route.params.groupId,
        };
      },
      update: (data) => data.group,
    },
  },
  data() {
    return {
      group: null,
      query: GET_GROUP,
      groupPrivacyPolicyBindings: {
        PUBLIC: "Grupa Publiczna",
        PRIVATE: "Grupa Prywatna",
      },
      date: null,
    };
  },
  computed: {
    ...mapState({
      me: (state) => state.auth.user,
    }),
    isMemberOfGroup: function () {
      if (this.group) {
        return this.group.members.some((item) => item.id == this.me.id);
      }
      return false;
    },
    isAbleToSeePosts: function () {
      if (this.group) {
        if (this.group.privacy === "PUBLIC") return true;
        else
          return !(this.group.privacy === "PRIVATE" && !this.isMemberOfGroup);
      }
      return false;
    },
  },
  methods: {
    createPost({ input }) {
      input["groups"] = {
        sync: [this.group.id],
      };
      this.$apollo.mutate({
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
      });
    },

    toggleGroupMembership() {
      this.$apollo
        .mutate({
          mutation: TOGGLE_MEMBERSHIP,
          variables: {
            user_id: this.me.id,
            group_id: this.group.id,
          },
        })
        .then(() => {
          this.$apollo.queries.group.refetch();
        });
    },
  },
  mounted() {
    this.date = moment(this.group.created_at).format("DD.MM.YYYY");

      this.$apollo.queries.group.refetch()

  }
};
</script>

<style scoped></style>
