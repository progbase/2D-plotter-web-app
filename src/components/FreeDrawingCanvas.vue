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
    this.initCanvas();

    this.$emit('change-point', this.lastPoint);
  },

  beforeDestroy() {
    this.destroyCanvas();
  },

  methods: {
    inBorders(point) {
      return point.x >= 0 && point.x <= this.size && point.y >= 0 && point.y <= this.size;
    },

    onMouseDown() {
      this.startDrawing();
    },

    onMouseMove({ absolutePointer }) {
      if (this.isDrawing) {
        const point = {
          x: Math.round(absolutePointer.x),
          y: Math.round(absolutePointer.y),
        };

        if (this.inBorders(point)) {
          this.lastPoint = point;
        } else {
          this.endDrawing();
        }
      } else {
        //
        if (!this.inBorders(absolutePointer)) {
          console.log('out of range');
        } else {
          //
        }
      }
    },

    onMouseUp() {
      if (this.isDrawing) {
        this.endDrawing();
      }
    },

    startDrawing() {
      this.isDrawing = true;
    },

    endDrawing() {
      this.$store.dispatch('pushPath', this.path);

      this.isDrawing = false;
      this.path = [];
    },

    destroyCanvas() {
      this.canvas.dispose();
      this.canvas = null;
    },

    initCanvas() {
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
    },
  },
};
</script>

<style>
#canva {
  margin: auto;
}
</style>
