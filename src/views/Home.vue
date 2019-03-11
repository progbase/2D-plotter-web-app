<template>
  <div class="home">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Image preview
          </h1>
          <h2 class="subtitle hero-upload">
            <span>
              Upload image you want to print and see how it might be look like
            </span>
            <upload @raw-load="rawLoaded" @mono-load="monoLoaded" />
          </h2>
        </div>
      </div>
    </section>

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
  width: 50%;
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

.hero-upload {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
</style>
