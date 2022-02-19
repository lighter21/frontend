<template>
  <v-list-item style="align-items: normal" dark>
    <v-list-item-avatar>
      <v-img :src="comment.user.avatar" :alt="comment.user.first_name + ' ' + comment.user.last_name" />
    </v-list-item-avatar>
    <v-list-item-content>
      <div class="my-auto font-weight-bold" style="font-size: 14px">
        {{ comment.user.first_name + " " + comment.user.last_name }}
      </div>
      <v-list-item-subtitle class="my-1">
        {{ comment.body }}
      </v-list-item-subtitle>
      <v-layout>
        <v-flex xs4>
          <v-layout row class="my-1">
            <div class="caption font-weight-bold mx-3">Lubię to!</div>
            <div class="grey--text caption font-weight-bold ml-3">
              {{ comment.created_at }}
            </div>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-list-item-content>
  </v-list-item>
</template>

<script>
export default {
  name: "Comment",
  props: ["comment"],
};
</script>

<style scoped></style>
