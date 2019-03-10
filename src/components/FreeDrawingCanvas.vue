<template>
  <div>
    <canvas
      id="canva"
      :width="size"
      :height="size"
      class="canva" />
  </div>
</template>

<script>
import { fabric } from 'fabric';

export default {
  name: 'FreeDrawingCanvas',

  props: {
    size: {
      type: Number,
      default: 400,
    },
  },

  data: () => ({
    canvas: null,
    isDrawing: false,
    path: [],
    lastPoint: { x: -1, y: -1 },
  }),

  watch: {
    lastPoint(newPoint) {
      if (this.isDrawing) this.path.push(newPoint);
      this.$emit('change-point', newPoint);
    },
  },

  mounted() {
    this.canvas = new fabric.Canvas('canva', {
      isDrawingMode: true,
      backgroundColor: '#efefef',
    });
    this.canvas.freeDrawingBrush.color = 'black';
    this.canvas.freeDrawingBrush.width = 4;
    this.canvas.renderAll();

    this.canvas.on('mouse:move', this.onMouseMove);
    this.canvas.on('mouse:down', this.onMouseDown);
    this.canvas.on('mouse:up', this.onMouseUp);

    this.$emit('change-point', this.lastPoint);
  },

  beforeDestroy() {
    this.canvas.dispose();
  },

  methods: {
    onMouseDown() {
      this.isDrawing = true;
    },

    onMouseMove({ absolutePointer }) {
      if (this.isDrawing) {
        this.lastPoint = {
          x: Math.round(absolutePointer.x),
          y: Math.round(absolutePointer.y),
        };
      }
    },

    onMouseUp() {
      this.$store.dispatch('pushPath', this.path);

      this.isDrawing = false;
      this.path = [];
    },
  },
};
</script>

<style>
#canva {
  margin: auto;
}
</style>
