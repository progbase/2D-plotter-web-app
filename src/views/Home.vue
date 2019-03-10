<template>
  <div class="home">
    <div class="columns">
      <div class="column">
        <upload @raw-load="rawLoaded" @mono-load="monoLoaded" />
      </div>
    </div>

    <div class="preview">
      <image-card
        :src="rawSrc"
        class="small-image"
        @click="swap" />

      <image-card
        :src="monoSrc"
        class="large-image" />
    </div>
  </div>
</template>

<script>
import PlaceholderImage from '../assets/meow.png';
import BWPlaceholderImage from '../assets/meow-bw.png';
import Upload from '../components/Uploader.vue';
import ImageCard from '../components/ImageCard.vue';

export default {
  name: 'Home',
  components: { Upload, ImageCard },

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

    swap() {
      const temp = this.rawSrc;
      this.rawSrc = this.monoSrc;
      this.monoSrc = temp;
    },
  },
};
</script>

<style lang="stylus">
.preview {
  position: relative;
  width: 60%;
  margin: auto;
}

.small-image {
  width: 20%;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  background-color: #fff;

  &:hover {
  }
}

.large-image {
  position: absolute;
  top: 0;
  width: 100%;
}

.small-image, .large-image {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
