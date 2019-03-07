<template>
  <div class="drawing">
    <div class="columns">
      <div class="column">
        <free-drawing-canvas :size="500" @change-point="onChangeBrushPoint" />
        <span>
          Current Brush Point (x: {{ point.x }}; y: {{ point.y }})
        </span>
      </div>
    </div>
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
#canvas {
  margin: auto;
}
</style>
