<template>
  <div class="home">
    <input
      type="file"
      name="pic"
      accept="image/*"
      @change="upload">


    <img
      class="raw-image"
      :src="rawSrc">

    <img
      class="mono-image"
      :src="monoSrc">
  </div>
</template>

<script>
export default {
  name: 'Home',
  components: {},

  data: () => ({
    rawSrc: '',
    monoSrc: '',
  }),

  methods: {
    async upload(e) {
      const imageFile = e.srcElement.files[0];

      this.rawSrc = await this.readRaw(imageFile);
      this.monoSrc = await this.monoify(imageFile);
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

        const imageData = context.getImageData(0, 0, imageBitmap.height, imageBitmap.width);

        for (let i = 0; i < imageData.data.length; i += 4) {
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

          imageData.data[i + 3] = 255; // alpha
        }

        context.putImageData(imageData, 0, 0);
        const imageBase64 = canvas.toDataURL();

        return imageBase64;
      });
    },
  },
};
</script>
