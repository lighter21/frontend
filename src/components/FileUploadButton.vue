<template>
  <div>
    <v-btn dark icon :loading="isSelecting" @click="handleFileImport">
      <v-icon> mdi-paperclip</v-icon>
    </v-btn>

    <v-file-input
      v-model="selectedFile"
      ref="uploader"
      accept="image/png, image/jpeg, image/bmp"
      class="d-none"
      @change="onFileChanged"
    ></v-file-input>
  </div>
</template>

<script>
export default {
  name: "FileUploadButton",
  props: ["value"],
  data() {
    return {
      isSelecting: false,
      selectedFile: null,
    };
  },
  methods: {
    handleFileImport() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );

      this.$refs.uploader.$refs.input.click();
    },
    onFileChanged() {
      this.$emit("input", this.selectedFile);
    },
  },
};
</script>
