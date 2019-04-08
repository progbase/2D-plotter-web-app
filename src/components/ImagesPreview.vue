<template>
  <div class="images-preview">
    <image-card :src="!swapped ? monoSrc : rawSrc" class="large-image" />

    <image-card
      :src="!swapped ? rawSrc : monoSrc"
      class="small-image"
      @click="swap" />
  </div>
</template>

<script>
import ImageCard from './ImageCard.vue';

export default {
  name: 'ImagesPreview',

  components: { ImageCard },

  props: {
    monoSrc: {
      type: String,
      required: true,
    },

    rawSrc: {
      type: String,
      required: true,
    },
  },

  data() {
    return {
      swapped: false,
    };
  },

  methods: {
    swap() {
      this.swapped = !this.swapped;
    },
  },
};
</script>

<style lang="stylus">
.images-preview {
  width: 100%;
  position: relative;
}

.small-image {
  width: 20%;
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 2;
  background-color: #fff;
}

.small-image, .large-image {
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}
</style>
