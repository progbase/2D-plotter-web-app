<template>
  <div class="image-card">
    <img
      class="image"
      :src="src"
      @click="$emit('click')">
  </div>
</template>

<script>
export default {
  name: 'ImageCard',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="stylus" scoped>
.image-card {
  background-color: #fff;
  padding: 2px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
}

.image {
  width: 100%;
}
</style>
