<template>
  <apollo-query
    :query="query"
    :variables="{ username: $route.params.username }"
    :update="(data) => data.groups"
    style="width: 100%"
  >
    <template v-slot="{ result: { loading, error, data } }">
      <div v-if="error">
        Wystąpił nieoczekiwany błąd - spróbuj odświeżyć stronę
      </div>
      <v-card dark rounded color="#474b5c">
        <v-card-title>
          Grupy
          <create-modal></create-modal>
        </v-card-title>
        <v-card-text>
          <div v-if="$apolloGlobalLoading" class="text-center">
            <v-progress-circular
              indeterminate
              color="primary"
            ></v-progress-circular>
          </div>

          <div v-for="group in data" :key="group.id">
            <v-layout>
              <router-link
                :to="`/group/${group.id}`"
                class="fill-height my-auto"
              >
                <v-avatar size="75" color="primary">
                  <v-img
                    :loading="$apolloGlobalLoading"
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
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
  </apollo-query>
</template>

<script>
import { GET_GROUPS } from "@/graphql/queries/Group";
import CreateModal from "@/views/Groups/CreateModal";

export default {
  name: "List",
  components: { CreateModal },
  data() {
    return {
      query: GET_GROUPS,
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
