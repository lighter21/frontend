<template>
  <v-dialog v-model="dialog" max-width="400">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="primary"
        dark
        v-bind="attrs"
        v-on="on"
        fab
        small
        right
        absolute
      >
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </template>
    <v-card dark>
      <v-card-title class="text-h5 my-2"> Utwórz nową grupę!</v-card-title>
      <v-card-text>
        <v-col>
          <v-text-field
            v-model="group.name"
            solo
            outlined
            dark
            label="Nazwa grupy"
          >
          </v-text-field>
          <v-text-field
            v-model="group.description"
            solo
            outlined
            dark
            label="Opis grupy"
          >
          </v-text-field>

          <v-select
            v-model="group.privacy"
            :items="privacyType"
            item-text="name"
            item-value="value"
            label="Ustawienia prywatności"
            solo
            outlined
            dark
          ></v-select>
        </v-col>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="dialog = false">
          Zamknij
        </v-btn>
        <v-btn color="green darken-1" text @click="create()"> Dodaj </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { CREATE_GROUP } from "@/graphql/mutations/Group";

export default {
  name: "CreateModal",
  data() {
    return {
      dialog: false,
      group: {
        name: "",
        description: "",
        privacy: "",
      },
      privacyType: [
        {
          name: "Publiczna",
          value: "PUBLIC",
        },
        {
          name: "Prywatna",
          value: "PRIVATE",
        },
      ],
    };
  },
  methods: {
    create() {
      this.$apollo
        .mutate({
          mutation: CREATE_GROUP,
          variables: {
            input: this.group,
          },
        })
        .then(({ data }) => {
          this.$router.push(`/group/${data.createGroup.id}`);
        });
    },
  },
};
</script>

<style scoped></style>
