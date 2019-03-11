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
          <div class="column is-offset-one-quarter">
            <free-drawing-canvas :size="500" @change-point="onChangeBrushPoint" />
            <span>
              Current Brush Point (x: {{ point.x }}; y: {{ point.y }})
            </span>
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
  }),

  methods: {
    onChangeBrushPoint(p) {
      this.point = p;
    },
  },
};
</script>

<style>

</style>
