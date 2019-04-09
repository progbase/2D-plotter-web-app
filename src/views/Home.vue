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
          <progress
            v-if="isPlotterDrawing"
            class="progress is-warning"
            :value="drawingProgress"
            max="100" />

          <button
            v-show="!isPlotterDrawing"
            class="button is-success"
            :disabled="!connected"
            @click="startDS">
            Start
          </button>

          <button
            v-show="isPlotterDrawing"
            class="button is-danger"
            @click="endDS">
            Stop
          </button>
        </div>

        <div class="column">
          <images-preview
            class="preview"
            :mono-src="monoSrc"
            :raw-src="rawSrc" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import papi from '../api';
import PlaceholderImage from '../assets/meow.png';
import BWPlaceholderImage from '../assets/meow-bw.png';
import Upload from '../components/Uploader.vue';
import ImagesPreview from '../components/ImagesPreview.vue';

export default {
  name: 'Home',
  components: { ImagesPreview, Upload },

  data: () => ({
    progressStep: 5,
    rawSrc: PlaceholderImage,
    monoSrc: BWPlaceholderImage,
    isPlotterDrawing: false,
    drawingProgress: 0,
  }),

  computed: {
    connected() {
      return this.$store.state.connected;
    },
  },

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

    endDrawing() {
      this.isPlotterDrawing = false;
      this.drawingProgress = 0;
    },

    startDrawing() {
      this.isPlotterDrawing = true;

      const self = this;
      const interval = setInterval(() => {
        self.drawingProgress += 1;
      }, 2000);

      setTimeout(() => {
        clearInterval(interval);

        self.endDrawing();
      }, 100000);
    },

    async startDS() {
      const res = await papi.startDS(this.monoSrc, true).catch(err => console.error(err));
      console.log('DS started:', res);
      this.startDrawing();
    },

    async endDS() {
      const res = await papi.endDS().catch(err => console.error(err));
      console.log('DS ended:', res);
      this.endDrawing();
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
