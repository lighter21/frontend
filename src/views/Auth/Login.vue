<template>
  <v-app>
    <v-content>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm10 md8 lg4>
            <v-card class="elevation-12 px-4 py-6">
              <v-card-title>
                <v-row class="mx-auto mb-6" justify="center">
                  <v-img max-width="30" src="@/assets/s.png"></v-img>
                  <p class="mx-5 display-1 my-auto">
                    <span class="logo">Stuck!</span>
                  </p>
                </v-row>
              </v-card-title>
              <v-card-text>
                <p v-if="errors" class="error--text text-center">Podano nieprawidłowe dane logowania</p>
                <validation-observer ref="observer" v-slot="{ invalid }">
                  <v-form @submit.prevent="login">
                    <ValidationProvider
                      name="email"
                      rules="required|email"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        v-model="credentials.email"
                        placeholder="jankowalski@gmail.com"
                        label="Adres e-mail"
                        dense
                        :error-messages="errors"
                        :loading="loading"
                      />
                    </ValidationProvider>

                    <v-text-field
                      outlined
                      type="password"
                      dense
                      v-model="credentials.password"
                      label="Hasło"
                      :loading="loading"
                    >
                    </v-text-field>

                    <v-btn
                      block
                      color="primary"
                      type="submit"
                      :disabled="invalid"
                      :loading="loading"
                    >
                      Zaloguj
                    </v-btn>
                  </v-form>
                </validation-observer>
              </v-card-text>
              <v-card-actions>
                <v-spacer> </v-spacer>
                Nie masz jeszcze konta?&nbsp;
                <a href="/register">
                  <span class="text-decoration-none">Zarejestruj się! </span>
                </a>
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import { LOGIN } from "@/store/actions.type";
import { mapState } from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapState({
      errors: (state) => state.auth.error,
      loading: (state) => state.auth.loading,
      isAuthenticated: (state) => state.auth.isAuthenticated,
    }),
  },
  data() {
    return {
      credentials: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    async login() {
      await this.$store.dispatch(LOGIN, this.credentials).then(() => {
        if (this.isAuthenticated) this.$router.push({ name: "Home" });
      });
    },
  },
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Kings&display=swap");

.logo {
  font-family: "Kings", cursive;
}
</style>
