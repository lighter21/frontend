<template>
  <div class="text-center">
    <v-menu
      v-model="menu"
      :close-on-content-click="false"
      :nudge-width="300"
      offset-y
      transition="slide-y-transition"
      bottom
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn dark icon v-bind="attrs" v-on="on">
          <v-icon>mdi-menu-down</v-icon>
        </v-btn>
      </template>

      <v-card>
        <v-list dark color="#474b5c">
          <v-list-item>
            <v-list-item-avatar>
              <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="John" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="getUserFullName()"></v-list-item-title>
              <v-list-item-subtitle v-text="user.email"></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-divider></v-divider>
        </v-list>

        <v-list dark color="#474b5c">
          <v-list-item to="/account/details/general">
            <v-list-item-avatar>
              <v-icon>
                mdi-account-edit-outline
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-title>
              Szczegółowe dane konta
            </v-list-item-title>
          </v-list-item>

          <v-list-item @click="logout">
            <v-list-item-avatar>
              <v-icon>
                mdi-logout
              </v-icon>
            </v-list-item-avatar>
            <v-list-item-title>
              Wyloguj
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>
<script>
import {mapState} from "vuex";
import {LOGOUT} from "@/store/actions.type";

export default {
  name: "UserMenu",
  computed: {
    ...mapState({
      user: (state) => state.auth.user,
    }),
  },
  data: () => ({
    fav: true,
    menu: false,
    message: false,
    hints: true,
  }),
  methods: {
    getUserFullName() {
      return `${this.user.first_name} ${
          this.user.second_name ? this.user.second_name : ""
      } ${this.user.last_name}`;
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  }
};
</script>

<style scoped></style>
