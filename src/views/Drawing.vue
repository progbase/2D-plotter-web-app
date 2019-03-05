<template>
  <div class="drawing">
    <div class="columns">
      <div class="column">
        <canvas
          id="canvas"
          width="400"
          height="400"
          class="canvas" />
      </div>
    </div>
  </div>
</template>

<script>
import { fabric } from 'fabric';

export default {
  name: 'Drawing',
  components: {},

  data: () => ({
    canvas: null,
    isDrawing: false,
    path: [],
  }),

  mounted() {
    this.canvas = new fabric.Canvas('canvas', {
      isDrawingMode: true,
      backgroundColor: '#efefef',
    });
    this.canvas.freeDrawingBrush.color = 'black';
    this.canvas.freeDrawingBrush.width = 4;
    this.canvas.renderAll();

    this.canvas.on('mouse:move', this.onMouseMove);
    this.canvas.on('mouse:down', this.onMouseDown);
    this.canvas.on('mouse:up', this.onMouseUp);
  },

  methods: {
    onMouseDown() {
      this.isDrawing = true;
    },

    onMouseMove(e) {
      if (this.isDrawing) {
        const coords = e.absolutePointer;
        const lastCoord = this.path[this.path.length - 1];

        if (this.path.length === 0) {
          this.path.push(coords);
          return;
        }

        if (lastCoord.x !== coords.x || lastCoord.y !== coords.y) {
          this.path.push(coords);
        }
      }
    },

    onMouseUp() {
      this.isDrawing = false;
      this.$store.dispatch('pushPath', this.path);
      this.path = [];
    },
  },
};
</script>

<style>
#canvas {
  margin: auto;
}
</style>
