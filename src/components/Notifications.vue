<template>
  <div class="text-center">
    <v-menu offset-y>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon>
          <v-icon color="white" v-bind="attrs" v-on="on">mdi-bell</v-icon>
        </v-btn>
      </template>

      <v-list dark color="#474b5c" three-line width="450">
        <v-subheader class="mx-2">Powiadomienia</v-subheader>
        <v-divider></v-divider>

        <template v-for="(item, index) in user.received_invitations">
          <v-list-item :key="index">
            <v-list-item-avatar>
              <v-img src="https://cdn.vuetifyjs.com/images/lists/1.jpg"></v-img>
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>
                Nowe zaproszenie do grona znajomych!
              </v-list-item-title>
              <v-list-item-subtitle>
                {{
                  `Użytkownik ${getUserFullName(
                    item.sender
                  )} wysłał Ci zaproszenie do grona znajomych`
                }}
              </v-list-item-subtitle>
              <v-list-item-action class="flex-row mt-0">
                <v-spacer></v-spacer>
                <v-btn small color="success" class="mx-2"> Akceptuj</v-btn>
                <v-btn small color="danger mr-6"> Odrzuć</v-btn>
              </v-list-item-action>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Notifications",
  computed: {
    ...mapState({
      loading: (state) => state.auth.loading,
      user: (state) => state.auth.user,
    }),
  },
  data: () => ({
    items: [
      { header: "Zaproszenia" },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/1.jpg",
        title: "Brunch this weekend?",
        subtitle: `<span class="text--primary">Ali Connors</span> &mdash; I'll be in your neighborhood doing errands this weekend. Do you want to hang out?`,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/2.jpg",
        title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
        subtitle: `<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but I'm out of town this weekend.`,
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/3.jpg",
        title: "Oui oui",
        subtitle:
          '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/4.jpg",
        title: "Birthday gift",
        subtitle:
          '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
      },
      { divider: true, inset: true },
      {
        avatar: "https://cdn.vuetifyjs.com/images/lists/5.jpg",
        title: "Recipe to try",
        subtitle:
          '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
      },
    ],
  }),
  methods: {
    getUserFullName(user) {
      return `${user.first_name} ${user.last_name}`;
    },
  },
};
</script>

<style scoped></style>
