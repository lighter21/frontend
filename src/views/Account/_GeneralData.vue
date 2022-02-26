<template>
  <v-card dark class="pa-4" color="#474b5c" elevation="4">
    <v-card-title> Informacje o Tobie</v-card-title>
    <v-card-subtitle>
      W dowolnej chwili możesz wyświetlić i zmienić informacje o sobie.
    </v-card-subtitle>
    <v-card-text>
      <validation-observer ref="observer" v-slot="{ invalid }">
        <form @submit.prevent="submit">
          <ValidationProvider
            name="name"
            rules="required|min:2|max:255|alpha_spaces"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="userGeneralData.first_name"
              :counter="50"
              outlined
              :loading="$apolloGlobalLoading"
              :error-messages="errors"
              label="Pierwsze imie"
              dark
            />
          </ValidationProvider>

          <ValidationProvider
            rules="max:255|alpha_spaces"
            name="last_name"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="userGeneralData.second_name"
              :counter="50"
              outlined
              :error-messages="errors"
              :loading="$apolloGlobalLoading"
              label="Drugie imię"
              dark
            />
          </ValidationProvider>

          <ValidationProvider
            name="last_name"
            rules="required|min:2|max:255|alpha_spaces"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="userGeneralData.last_name"
              :counter="50"
              outlined
              :error-messages="errors"
              :loading="$apolloGlobalLoading"
              label="Nazwisko"
              dark
            />
          </ValidationProvider>

          <ValidationProvider
            name="email"
            rules="required|email"
            v-slot="{ errors }"
          >
            <v-text-field
              v-model="userGeneralData.email"
              :counter="50"
              outlined
              :loading="$apolloGlobalLoading"
              label="Email"
              dark
              :error-messages="errors"
              type="email"
            />
          </ValidationProvider>

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
                Zamknij
              </v-btn>
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

          <v-divider></v-divider>

          <v-card-subtitle> Zdjęcie profilowe</v-card-subtitle>

          <v-row class="my-4">
            <v-avatar size="100" color="primary" class="fill-height my-auto">
              <img
                :loading="$apolloGlobalLoading"
                :src="userGeneralData.parsed_avatar_path"
                alt="John"
              />
            </v-avatar>
            <v-file-input
              class="ml-6 my-auto"
              v-model="file"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Wybierz swój avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
            ></v-file-input>
          </v-row>

          <v-btn class="mr-4" type="submit" :disabled="invalid" color="primary"> Zapisz</v-btn>
        </form>
      </validation-observer>
    </v-card-text>
  </v-card>
</template>

<script>
import { GET_USER_GENERAL_DATA } from "@/graphql/queries/User";
import { mapState } from "vuex";
import { UPDATE_USER_GENERAL_DATA } from "@/graphql/mutations/User";
import { uploadImage } from "@/graphql/mutations/Image";
import { CHECK_AUTH } from "@/store/mutations.type";

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
        avatar: "",
      },
      menu: false,
      file: undefined,
      uploading: false,
    };
  },
  methods: {
    submit() {
      if (this.file) {
        this.uploadFile().then(() => {
          this.saveUserGeneralData();
        });
      } else {
        this.saveUserGeneralData();
      }

      this.$router.push({ name: "Home" });
    },

    saveUserGeneralData() {
      let input = Object.assign({}, this.userGeneralData);
      delete input.parsed_avatar_path;
      delete input.__typename;
      this.$apollo
        .mutate({
          mutation: UPDATE_USER_GENERAL_DATA,
          variables: {
            id: this.me.id,
            input: input,
          },
        })
        .then(() => {
          this.flashMessage.success({
            message: "Zapisano pomyślnie!",
          });
        });
    },

    uploadFile() {
      this.uploading = true;
      return uploadImage(this.me.id, "App\\Models\\User", this.file).then(
        ({ data }) => {
          if (!data.errors) {
            this.uploading = false;
            this.userGeneralData.avatar = data.data.UploadImage.path;
            this.$store.dispatch(CHECK_AUTH);
          } else {
            this.uploading = false;
          }
        }
      );
    },
  },
};
</script>

<style scoped></style>
