<template>
  <div>
    <v-fade-transition mode="out-in">
      <v-row class="my-3 grey darken-4 rounded">
        <v-img
          contain
          :src="imagesLinks[0]"
          @click="index = 0"
          class="mx-auto image"
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
export default {
  name: "PostImageSection",
  props: ["image"],
  data() {
    return {
      index: null,
    };
  },
  computed: {
    imagesLinks: function () {
      let images = [this.image]
      return images.map(item => item.parsed_path)
    }
  }
};
</script>

<style>
.blueimp-gallery-display {
  display: none;
  opacity: 1;
}
.image {
  cursor: pointer;
  filter: blur(1px);
  transition: all 0.5s ease-out;
}
.image:hover {
  background: transparent;
  filter: blur(0px);
}

@media screen and (min-width: 600px) {
  .image {
    max-height: 450px;
  }
}

@media screen and (min-width: 960px) {
  .image {
    max-height: 600px;
  }
}

@media screen and (min-width: 1264px) {
  .image {
    max-height: 800px;
  }
}
@media screen and (min-width: 1904px) {
  .image {
    max-height: 800px;
  }
}
</style>
