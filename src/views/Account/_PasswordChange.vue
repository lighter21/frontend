<template>
  <v-card dark class="pa-4" color="#474b5c" elevation="4">
    <v-card-title> Zmiana hasła </v-card-title>
    <v-card-text>
      <!--      <p v-for="error in errors" class="error&#45;&#45;text text-center" :key="error">-->
      <!--        {{ error }}-->
      <!--      </p>-->

      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit" ref="form">
          <ValidationProvider
            rules="required"
            data-vv-validate-on="blur"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="passwordInfo.old_password"
              :counter="50"
              type="password"
              outlined
              :error-messages="errors"
              :loading="$apolloGlobalLoading"
              label="Twoje obecne hasło"
              dark
            />
          </ValidationProvider>

          <v-divider class="mt-2"></v-divider>

          <v-card-subtitle>
            Wprowadź i potwierdź swoje nowe hasło
          </v-card-subtitle>
          <ValidationProvider
            name="password"
            data-vv-validate-on="blur"
            rules="required|min:8|max:255|confirmed:confirmation"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="passwordInfo.password"
              :counter="50"
              outlined
              type="password"
              :error-messages="errors"
              :loading="$apolloGlobalLoading"
              label="Nowe hasło"
              dark
            />
          </ValidationProvider>
          <ValidationProvider
            name="confirmation"
            vid="confirmation"
            rules=""
            data-vv-validate-on="blur"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="passwordInfo.password_confirmation"
              :counter="50"
              outlined
              type="password"
              :error-messages="errors"
              :loading="$apolloGlobalLoading"
              label="Potwierdź hasło"
              dark
            />
          </ValidationProvider>
          <v-btn class="mr-4" type="submit" color="primary" :disabled="invalid">
            Zapisz</v-btn
          >
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { CHANGE_USER_PASSWORD } from "@/graphql/mutations/User";
import { LOGOUT } from "@/store/actions.type";

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
            message: "Zmianiono hasło, zostaniesz teraz wylogowany",
          });
          window.setTimeout(this.logout(), 1000);
        });
    },
    logout() {
      this.$store.dispatch(LOGOUT).then(() => {
        this.$router.push({ name: "Login" });
      });
    },
  },
};
</script>

<style scoped></style>
