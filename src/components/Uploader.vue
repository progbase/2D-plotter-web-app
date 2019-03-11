<template>
  <span class="uploader-container">
    <button
      class="button is-warning"
      :class="{ 'is-loading': uploading }"
      :disabled="uploading"
      @click="triggerInput">
      Upload Image
    </button>

    <input
      ref="input"
      class="hidden-input"
      type="file"
      name="pic"
      accept="image/*"
      @change="onUpload">
  </span>
</template>

<script>
export default {
  name: 'Uploader',

  data: () => ({
    uploading: false,
  }),

  methods: {
    triggerInput() {
      this.$refs.input.click();
    },

    async onUpload(e) {
      this.$emit('start-load');
      this.uploading = true;

      if (e.srcElement.files.length < 0) {
        this.uploading = false;
        this.$emit('error-load', { message: 'no files detected', err: null });
        return;
      }


      const imageFile = e.srcElement.files[0];

      this.$emit('upload', imageFile);

      try {
        const rawSrc = await this.readRaw(imageFile);
        const monoSrc = await this.monoify(imageFile);

        this.$emit('raw-load', rawSrc);
        this.$emit('mono-load', monoSrc);
      } catch (err) {
        this.$emit('error-load', { message: 'raw/mono was not loaded', err });
      }

      this.uploading = false;
    },

    readRaw(imageFile) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (e) => {
          resolve(e.target.result);
        };


        reader.onerror = (err) => {
          reject(err);
        };

        reader.readAsDataURL(imageFile);
      });
    },

    monoify(imageFile) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      return createImageBitmap(imageFile).then((imageBitmap) => {
        canvas.width = imageBitmap.width;
        canvas.height = imageBitmap.height;

        context.drawImage(imageBitmap, 0, 0);

        const imageData = context.getImageData(0, 0, imageBitmap.width, imageBitmap.height);

        const length = imageData.height * imageBitmap.width * 4;
        for (let i = 0; i < length; i += 4) {
          const R = imageData.data[i + 0];
          const G = imageData.data[i + 1];
          const B = imageData.data[i + 2];
          const A = imageData.data[i + 3];

          const GRAY = (R + G + B) / 3;

          if (GRAY < 128 && A > 0) { // todo: upgrade algotithm
            imageData.data[i + 0] = 0;
            imageData.data[i + 1] = 0;
            imageData.data[i + 2] = 0;
          } else {
            imageData.data[i + 0] = 255;
            imageData.data[i + 1] = 255;
            imageData.data[i + 2] = 255;
          }

          imageData.data[i + 3] = 255;
        }

        context.putImageData(imageData, 0, 0);

        return canvas.toDataURL();
      });
    },
  },
};
</script>

<style lang="stylus">
.hidden-input {
  display: none;
}

</style>
