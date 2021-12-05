<template>
  <v-card>
    <v-form @submit.prevent="register" ref="form">
      <v-text-field
        outlined
        v-model="credentials.first_name"
        placeholder="jankowalski@gmail.com"
        label="Imię"
        dense
      >
      </v-text-field>

      <v-text-field
        outlined
        v-model="credentials.second_name"
        placeholder="jankowalski@gmail.com"
        label="Drugie imię"
        dense
      >
      </v-text-field>

      <v-text-field
        outlined
        v-model="credentials.last_name"
        placeholder="jankowalski@gmail.com"
        label="Nazwisko"
        dense
      >
      </v-text-field>

      <v-text-field
        outlined
        v-model="credentials.email"
        placeholder="jankowalski@gmail.com"
        label="Adres e-mail"
        dense
      >
      </v-text-field>

      <v-text-field
        outlined
        type="password"
        dense
        v-model="credentials.password"
        label="Hasło"
      >
      </v-text-field>

      <v-text-field
        outlined
        type="password"
        dense
        v-model="credentials.password_confirmation"
        label="Powtórz hasło"
      >
      </v-text-field>

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
            label="Picker in menu"
            prepend-icon="mdi-calendar"
            readonly
            v-bind="attrs"
            v-on="on"
          ></v-text-field>
        </template>
        <v-date-picker v-model="credentials.birth_date" no-title scrollable>
          <v-btn text color="primary" @click="menu = false"> Cancel </v-btn>
          <v-btn
            text
            color="primary"
            @click="$refs.menu.save(credentials.birth_date)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>

      <v-btn block color="primary" type="submit"> Zarejestruj się! </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { REGISTER } from "@/store/actions.type";

export default {
  name: "Register",
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
        password: "",
        password_confirmation: "",
      },
      menu: false,
    };
  },
  methods: {
    register() {
      this.$store.dispatch(REGISTER, this.credentials).then(() => {
        this.$attrs.form.clear();
      });
    },
  },
};
</script>
