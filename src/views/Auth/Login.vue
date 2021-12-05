<template>
  <v-card>
    <v-form @submit.prevent="login">
      <v-text-field
        outlined
        v-model="credentials.email"
        placeholder="jankowalski@gmail.com"
        label="Adres e-mail"
        dense
        :loading="loading"
      >
      </v-text-field>

      <v-text-field
        outlined
        type="password"
        dense
        v-model="credentials.password"
        label="Hasło"
        :loading="loading"
      >
      </v-text-field>

      <v-btn block color="primary" type="submit" :loading="loading">
        Zaloguj
      </v-btn>
    </v-form>
  </v-card>
</template>

<script>
import { LOGIN } from "@/store/actions.type";
import { mapState } from "vuex";

export default {
  name: "Login",
  computed: {
    ...mapState({
      error: (state) => state.auth.error,
      loading: (state) => state.auth.loading,
      isAuthenticated: (state) => state.auth.isAuthenticated,
      user: (state) => state.auth.user,
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
