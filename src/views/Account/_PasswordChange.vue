<template>
  <v-card dark class="pa-4" color="#474b5c" elevation="4">
    <v-card-title> Zmiana hasła </v-card-title>
    <v-card-text>
      <form @submit.prevent="submit" ref="form">
        <v-text-field
          v-model="passwordInfo.old_password"
          :counter="50"
          type="password"
          outlined
          :loading="$apolloGlobalLoading"
          label="Twoje obecne hasło"
          dark
        ></v-text-field>

        <v-divider class="mt-2"></v-divider>

        <v-card-subtitle>
          Wprowadź i potwierdź swoje nowe hasło
        </v-card-subtitle>
        <v-text-field
          v-model="passwordInfo.password"
          :counter="50"
          outlined
          type="password"
          :loading="$apolloGlobalLoading"
          label="Nowe hasło"
          dark
        ></v-text-field>
        <v-text-field
          v-model="passwordInfo.password_confirmation"
          :counter="50"
          outlined
          type="password"
          :loading="$apolloGlobalLoading"
          label="Potwierdź hasło"
          dark
        ></v-text-field>
        <v-btn class="mr-4" type="submit" color="primary"> Zapisz</v-btn>
      </form>
    </v-card-text>
  </v-card>
</template>

<script>
import { CHANGE_USER_PASSWORD } from "@/graphql/mutations/User";

export default {
  name: "PasswordChange",
  data() {
    return {
      passwordInfo: {
        old_password: "",
        password: "",
        password_confirmation: "",
      },
    };
  },
  methods: {
    submit() {
      this.$apollo
        .mutate({
          mutation: CHANGE_USER_PASSWORD,
          variables: {
            input: this.passwordInfo,
          },
        })
        .then(() => {
          this.flashMessage.success({
            message: "Zmianiono hasło!",
          });
        });
    },
  },
};
</script>

<style scoped></style>
