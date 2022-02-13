<template>
  <v-card dark class="pa-4" color="#474b5c" elevation="4">
    <v-card-title> Informacje o Tobie </v-card-title>
    <v-card-subtitle>
      W dowolnej chwili możesz wyświetlić i zmienić informacje o sobie.
    </v-card-subtitle>
    <v-card-text>
      <form @submit.prevent="submit" ref="form">
        <v-text-field
          v-model="userGeneralData.first_name"
          :counter="50"
          outlined
          :loading="$apolloGlobalLoading"
          label="Pierwsze imie"
          dark
        ></v-text-field>
        <v-text-field
          v-model="userGeneralData.second_name"
          :counter="50"
          outlined
          :loading="$apolloGlobalLoading"
          label="Drugie imię"
          dark
        ></v-text-field>
        <v-text-field
          v-model="userGeneralData.last_name"
          :counter="50"
          outlined
          :loading="$apolloGlobalLoading"
          label="Nazwisko"
          dark
        ></v-text-field>
        <v-text-field
          v-model="userGeneralData.email"
          :counter="50"
          outlined
          :loading="$apolloGlobalLoading"
          label="Email"
          dark
          type="email"
        ></v-text-field>
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          transition="scale-transition"
          offset-y
          min-width="auto"
          :return-value.sync="userGeneralData.birth_date"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              :label="'Data urodzenia: ' + userGeneralData.birth_date"
              prepend-inner-icon="mdi-calendar"
              readonly
              :loading="$apolloGlobalLoading"
              outlined
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker no-title scrollable>
            <v-btn
              text
              color="primary"
              :loading="$apolloGlobalLoading"
              @click="menu = false"
            >
              Zamknij</v-btn
            >
            <v-btn
              text
              color="primary"
              :loading="$apolloGlobalLoading"
              @click="$refs.menu.save(userGeneralData.birth_date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-btn class="mr-4" type="submit" color="primary"> Zapisz</v-btn>
        <v-btn @click="$refs.form.clear()" color="secondary"> Wyczyść</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { GET_USER_GENERAL_DATA } from "@/graphql/queries/User";
import { mapState } from "vuex";
import { UPDATE_USER_GENERAL_DATA } from "@/graphql/mutations/User";

export default {
  name: "GeneralData",
  apollo: {
    userGeneralData: {
      query: GET_USER_GENERAL_DATA,
      variables() {
        return {
          username: this.me.username,
        };
      },
      update: (data) => data.user,
    },
  },
  computed: {
    ...mapState({
      me: (state) => state.auth.user,
    }),
  },
  data() {
    return {
      userGeneralData: {
        email: "",
        first_name: "",
        second_name: "",
        last_name: "",
        birth_date: "",
      },
      menu: false,
    };
  },
  methods: {
    submit() {
      let input = Object.assign({}, this.userGeneralData);
      delete input.__typename;
      this.$apollo.mutate({
        mutation: UPDATE_USER_GENERAL_DATA,
        variables: {
          id: this.me.id,
          input: input,
        },
      });
    },
  },
};
</script>

<style scoped></style>
