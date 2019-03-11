<template>
  <div class="home">
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          Image preview
        </h1>

        <h2 class="subtitle hero-upload">
          <span>
            Upload image you want to print and see how it might be look like
          </span>
          <upload
            @error-load="loadingError"
            @raw-load="rawLoaded"
            @mono-load="monoLoaded" />
        </h2>
      </div>
    </section>

    <section class="section">
      <div class="columns">
        <div class="column">
          Controls
        </div>

        <div class="column">
          <images-preview
            class="preview"
            :mono-src="monoSrc"
            :raw-src="rawSrc" />
        </div>
      </div>
    </section>

    <progress class="progress is-warning" :value="75" max="100" />
  </div>
</template>

<script>
import PlaceholderImage from '../assets/meow.png';
import BWPlaceholderImage from '../assets/meow-bw.png';
import Upload from '../components/Uploader.vue';
import ImagesPreview from '../components/ImagesPreview.vue';

export default {
  name: 'Home',
  components: { ImagesPreview, Upload },

  data: () => ({
    rawSrc: PlaceholderImage,
    monoSrc: BWPlaceholderImage,
  }),

  methods: {
    rawLoaded(src) {
      this.rawSrc = src;
    },

    monoLoaded(src) {
      this.monoSrc = src;
    },

    loadingError() {
      // show error
    },
  },
};
</script>

<style lang="stylus">
.preview {
  /*width: 50%;*/
}

.hero-upload {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
