<template>
  <div class="text-center">
    <v-menu
      :close-on-content-click="false"
      offset-y
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon color="white">mdi-bell</v-icon>
        </v-btn>
      </template>

      <v-list dark color="#474b5c" three-line width="450">
        <v-subheader class="mx-2">Powiadomienia</v-subheader>
        <v-divider></v-divider>

        <div
          class="text-center text-body-2 my-4"
          v-if="user.received_invitations.length === 0"
        >
          Brak nowych powiadomień
        </div>

        <template v-for="(item, index) in user.received_invitations">
          <v-list-item :key="index">
            <v-list-item-avatar>
              <v-img :src="item.parsed_avatar_path"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                Nowe zaproszenie do grona znajomych!
              </v-list-item-title>
              <v-list-item-subtitle>
                {{
                  `Użytkownik ${getUserFullName(item)}
                  wysłał Ci zaproszenie do grona znajomych`
                }}
              </v-list-item-subtitle>
              <v-list-item-action class="flex-row mt-0">
                <v-spacer></v-spacer>
                <div v-if="item.pivot.status === 'PENDING'">
                  <v-btn
                    small
                    color="success"
                    class="mx-2"
                    @click="accept(item)"
                  >
                    Akceptuj
                  </v-btn>
                  <v-btn small color="danger mr-6" @click="decline(item)">
                    Odrzuć</v-btn
                  >
                </div>
              </v-list-item-action>
              <div class="text-center" v-if="item.pivot.status === 'ACCEPTED'">
                Użytkownik został dodany do listy znajomych
              </div>
              <div class="text-center" v-if="item.pivot.status === 'DECLINED'">
                Zaproszenie zostało odrzucone
              </div>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { UPDATE_OR_CREATE_FRIEND } from "@/graphql/mutations/User";

export default {
  name: "Notifications",
  computed: {
    ...mapState({
      loading: (state) => state.auth.loading,
      user: (state) => state.auth.user,
    }),
  },
  methods: {
    getUserFullName(user) {
      return `${user.first_name} ${user.last_name}`;
    },
    accept(friend) {
      friend.pivot.status = "ACCEPTED";
      return this.updateFriendRequest(friend.id, "ACCEPTED");
    },
    decline(friend) {
      friend.pivot.status = "DECLINED";
      return this.updateFriendRequest(friend.id, "DECLINED");
    },
    updateFriendRequest(friend_id, status) {
      this.$apollo.mutate({
        mutation: UPDATE_OR_CREATE_FRIEND,
        variables: {
          id: this.user.id,
          friend_id: friend_id,
          status: status,
        },
      });
    },
  },
};
</script>

<style scoped></style>
