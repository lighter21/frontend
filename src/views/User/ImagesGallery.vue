<template>
  <div>
    <div v-if="images.length === 0" class="text-center ma-4 text-h6">
      Użytkownik nie dodał jeszcze żadnych zdjęć
    </div>
    <div v-if="$apolloGlobalLoading" class="text-center">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </div>

    <v-fade-transition mode="out-in">
      <v-row style="justify-content: space-evenly">
        <div
          class="rounded-lg mx-4 my-4 image-wrapper"
          v-for="(image, i) in imagesLinks"
          :key="image"
        >
          <v-img
            height="300"
            width="300"
            :src="image"
            contain
            @click="index = i"
          >
            <template v-slot:placeholder>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular
                  indeterminate
                  color="grey lighten-5"
                ></v-progress-circular>
              </v-row>
            </template>
          </v-img>
        </div>
      </v-row>
    </v-fade-transition>
    <v-gallery
      :images="imagesLinks"
      :index="index"
      @close="index = null"
    ></v-gallery>
  </div>
</template>

<script>
import { GET_IMAGES_GALLERY } from "@/graphql/queries/Image";

export default {
  name: "ImagesGallery",
  apollo: {
    images: {
      query: GET_IMAGES_GALLERY,
      variables() {
        return {
          username: this.$route.params.username,
        };
      },
      update: (data) => data.ImagesGallery,
    },
  },
  data() {
    return {
      images: [],
      imagesLinks: [],
      index: null,
    };
  },
  watch: {
    images: {
      handler() {
        this.imagesLinks = this.images.map((item) => item.parsed_path);
      },
      deep: true,
    },
  },
};
</script>

<style scoped>
.image-wrapper {
  width: 300px;
  height: 300px;
  background-color: #282b35;
  background-size: cover;
  cursor: pointer;
  margin: 5px;
}
</style>
