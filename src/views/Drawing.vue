<template>
  <div class="drawing">
    <section class="hero">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Real time drawing
          </h1>
          <h2 class="subtitle">
            <span>
              Just connect to plotter, change mode to <b>real time drawing</b>
              and start drawing on canvas.
              Draw some curve line and look at plotter moves =)
            </span>
          </h2>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <free-drawing-canvas
              :size="400"
              @change-point="onChangeBrushPoint" />
          </div>

          <div class="column">
            <div>Mode {{ mode }}</div>

            <div>
              <button
                class="button is-warning"
                :class="{ 'is-loading': changingMode }"
                @click="onChangeMode">
                Change
              </button>
              <!--<span>mode to {{ mode == 'normal' ? 'real-time' : 'normal' }}</span>-->
            </div>
            <div>
              Current Brush Point (x: {{ point.x }}; y: {{ point.y }})
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import FreeDrawingCanvas from '../components/FreeDrawingCanvas.vue';

export default {
  name: 'Drawing',
  components: { FreeDrawingCanvas },

  data: () => ({
    point: { x: NaN, y: NaN },
    changingMode: false,
  }),

  computed: {
    mode() {
      return this.$store.state.mode;
    },
  },

  methods: {
    onChangeBrushPoint(p) {
      this.point = p;
    },

    async onChangeMode() {
      this.changingMode = true;
      const newMode = this.mode == 'normal' ? 'real-time' : 'normal';

      await this.$store.dispatch('changeMode', newMode);
      this.changingMode = false;
    }
  },
};
</script>

<style lang="stylus">

</style>
