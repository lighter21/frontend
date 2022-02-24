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
                <p v-for="error in errors" class="error--text text-center" :key="error">{{error}}</p>

                <validation-observer ref="observer" v-slot="{ invalid }">
                  <v-form @submit.prevent="register" ref="form">
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
                        name="email"
                        :error-messages="errors"
                        dense
                        type="email"
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      name="username"
                      rules="required|min:2|max:255"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        name="username"
                        outlined
                        v-model="credentials.username"
                        placeholder="jan.kowalski"
                        label="Nazwa użytkownika"
                        :error-messages="errors"
                        dense
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      name="name"
                      rules="required|min:2|max:255|alpha_spaces"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        v-model="credentials.first_name"
                        name="name"
                        label="Imię"
                        :error-messages="errors"
                        dense
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      rules="max:255|alpha_spaces"
                      name="last_name"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        name="last_name"
                        v-model="credentials.second_name"
                        placeholder="jankowalski@gmail.com"
                        :error-messages="errors"
                        label="Drugie imię"
                        dense
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      name="last_name"
                      rules="required|min:2|max:255|alpha_spaces"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        name="last_name"
                        v-model="credentials.last_name"
                        placeholder="jankowalski@gmail.com"
                        label="Nazwisko"
                        :error-messages="errors"
                        dense
                      />
                    </ValidationProvider>

                    <ValidationProvider
                      name="password"
                      data-vv-validate-on="blur"
                      rules="required|min:8|max:255|confirmed:confirmation"
                      v-slot="{ errors }"
                    >
                      <v-text-field
                        outlined
                        name="password"
                        type="password"
                        dense
                        v-model="credentials.password"
                        label="Hasło"
                        :error-messages="errors"
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
                        outlined
                        type="password"
                        dense
                        v-model="credentials.password_confirmation"
                        label="Powtórz hasło"
                        :error-messages="errors"
                      />
                    </ValidationProvider>

                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="credentials.birth_date"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="credentials.birth_date"
                          label="Data urodzenia"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        />
                      </template>
                      <v-date-picker
                        v-model="credentials.birth_date"
                        no-title
                        scrollable
                      >
                        <v-btn text color="primary" @click="menu = false">
                          Anuluj
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.menu.save(credentials.birth_date)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-menu>

                    <v-btn
                      block
                      color="primary"
                      :disabled="invalid"
                      type="submit"
                    >
                      Zarejestruj się!
                    </v-btn>
                  </v-form>
                </validation-observer>
              </v-card-text>
              <v-card-actions>
                <v-spacer> </v-spacer>
                Masz już konto?&nbsp;
                <a href="/login">
                  <span class="text-decoration-none">Zaloguj się! </span>
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
import { REGISTER } from "@/store/actions.type";
import { ValidationProvider } from "vee-validate";
import { mapState } from "vuex";

export default {
  name: "Register",
  components: {
    ValidationProvider,
  },
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
        first_name: "",
        second_name: "",
        last_name: "",
        birth_date: new Date(
          Date.now() - new Date().getTimezoneOffset() * 60000
        )
          .toISOString()
          .substr(0, 10),
        email: "",
        username: "",
        password: "",
        password_confirmation: "",
      },
      menu: false,
    };
  },
  methods: {
    register() {
      this.$store.dispatch(REGISTER, this.credentials).then((response) => {
        if (!response.data.errors) {
          this.$router.push({ name: "Home" });
        }
      });
    },
  },
};
</script>
