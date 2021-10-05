const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  const bg = "white";
  const main = opacity => `rgba(255, 93, 143, ${opacity})`;
  const margin = 100;

  return ({context, width, height}) => {
    context.fillStyle = bg;
    context.fillRect(0, 0, width, height);

    const step = width / 400;
    const fade = "down";
    for (var i = 0; i < width; i += step) {
      for (var j = 0; j < height; j += step) {
        const x = lerp(margin, width - margin, i / width);
        const y = lerp(margin, height - margin, j / width);
        const size = step - (step / y) * 50;
        const opacity = fade == "down" ? 1 - y / height : y / height;
        context.fillStyle = main(1);
        context.fillRect(x, y, size, size);
      }
    }
  };
};

canvasSketch(sketch, settings);
