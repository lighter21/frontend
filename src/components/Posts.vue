<template>
  <div>
    <div class="text-center" v-if="!posts">
      Nie dodano jeszcze żadnych postów. Dodaj pierwszy!
    </div>
    <v-card
      class="my-3"
      rounded
      outlined
      :loading="loading"
      dark
      color="#474b5c"
      v-for="post in posts"
      :key="post.id"
    >
      <v-list-item>
        <v-list-item-avatar>
          <img
            :loading="loading"
            src="https://cdn.vuetifyjs.com/images/john.jpg"
            alt="John"
          />
        </v-list-item-avatar>
        <v-list-item-content class="mt-2">
          <v-list-item-title class="subtitle">
            {{ post.user.first_name + " " + post.user.last_name }}
          </v-list-item-title>
          <v-list-item-subtitle class="caption">
<!--            {{ post.audience }}-->
            Publiczny
          {{post.created_at}}
          </v-list-item-subtitle>
        </v-list-item-content>
        <v-list-item-action>
          <v-icon>more_horiz</v-icon>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
      <v-card-text>
        <div class="body1 mb-4">
          {{ post.body }}
        </div>
        <v-divider></v-divider>
        <v-layout class="py-4">
          <v-menu attach open-on-hover top offset-y min-width="200px">
            <template v-slot:activator="{ on }">
              <v-flex v-on="on" xs4>
                <v-layout>
                  <v-avatar size="20" class="ml-1">
                    <v-img
                      :loading="loading"
                      src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/blue-heart_1f499.png"
                    >
                    </v-img>
                  </v-avatar>
                  <v-avatar size="20" class="ml-1">
                    <v-img
                      src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/winking-face_1f609.png"
                    >
                    </v-img>
                  </v-avatar>
                  <v-avatar size="20" class="ml-1">
                    <v-img
                      src="https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/160/facebook/65/slice-of-pizza_1f355.png"
                    >
                    </v-img>
                  </v-avatar>
                  <div class="ml-3">+26</div>
                </v-layout>
              </v-flex>
            </template>
          </v-menu>
          <v-flex class="text-right">
            <v-layout wrap justify-end>
              <div class="mr-3 font-weight-bold">
                {{ post.comments.length + " komentarze" }}
              </div>
            </v-layout>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card-text>
      <comments-section :comments="post.comments" :post-id="post.id">
      </comments-section>
    </v-card>
  </div>
</template>

<script>
import CommentsSection from "@/components/CommentsSection";

export default {
  name: "Posts",
  components: { CommentsSection },
  props: ["posts", "loading"],
};
</script>

<style scoped></style>
