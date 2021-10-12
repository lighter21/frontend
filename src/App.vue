<template>
  <v-app>
    <component :is="layout">
      <v-main>
        <router-view />
      </v-main>
    </component>
  </v-app>
</template>

<script>
export default {
  name: "App",
  computed: {
    layout() {
      const layout = this.$route.meta.layout;
      return () => import(`@/layouts/${layout}.vue`);
    },
  },
};
</script>
