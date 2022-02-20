<template>
  <v-card dark rounded color="#474b5c">
    <v-card-title>
      Grupy
      <create-modal></create-modal>
    </v-card-title>
    <v-card-text>
      <!--          <div v-if="error">-->
      <!--            Wystąpił nieoczekiwany błąd - spróbuj odświeżyć stronę-->
      <!--          </div>-->
      <div v-if="groups.length === 0" class="text-center ma-4 text-h6">
        Nie dodano jeszcze żadnej grupy. Stwórz pierwszą!
      </div>
      <div v-if="$apolloGlobalLoading" class="text-center">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>

      <div v-for="group in groups" :key="group.id">
        <v-layout>
          <router-link :to="`/group/${group.id}`" class="fill-height my-auto">
            <v-avatar size="75" color="primary">
              <v-img
                :loading="$apolloGlobalLoading"
                :src="default_group_photo"
                alt="John"
              />
            </v-avatar>
          </router-link>
          <v-col class="">
            <router-link
              class="text-decoration-none white--text text-body-1 ma-0 pa-0 d-block"
              :to="`/group/${group.id}`"
              >{{ group.name }}
            </router-link>
            <span class="caption ma-0">
              {{
                groupPrivacyPolicyBindings[group.privacy] +
                " " +
                group.created_at
              }}
            </span>
            <p class="ma-0">{{ group.description.substr(0, 200) }}</p>
          </v-col>
        </v-layout>
        <v-divider class="my-2"></v-divider>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
import { GET_GROUPS } from "@/graphql/queries/Group";
import CreateModal from "@/views/Groups/CreateModal";
import default_group_photo from "@/assets/default_group_photo.png"

export default {
  name: "List",
  apollo: {
    groups: {
      query: GET_GROUPS,
      variables() {
        return {
          username: this.$route.params.username,
        };
      },
      update: (data) => data.groups,
    },
  },
  components: { CreateModal },
  data() {
    return {
      default_group_photo: default_group_photo,
      groups: [],
      groupPrivacyPolicyBindings: {
        PUBLIC: "Grupa Publiczna",
        PRIVATE: "Grupa Prywatna",
      },
    };
  },
  methods: {},
};
</script>

<style scoped></style>
