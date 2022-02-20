<template>
  <div>
    <v-fade-transition mode="out-in">
      <v-row class="my-3 grey darken-4 rounded">
        <v-img
          contain
          :src="image.parsed_path"
          @click="index = 1"
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
      :images="[image.parsed_path]"
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
};
</script>

<style scoped>
.image {
  cursor: pointer;
  filter: blur(1px);
  transition: all 0.5s ease-out;
}
.image:hover {
  background: transparent;
  filter: blur(0px);
}

@media screen and (min-width: 600px){
  .image {
    max-height: 450px;
  }

}

@media screen and (min-width: 960px){
  .image {
    max-height: 600px;
  }
}

@media screen and (min-width: 1264px){
  .image {
    max-height: 800px;
  }
}
@media screen and (min-width: 1904px){
  .image {
    max-height: 800px;
  }
}

</style>
