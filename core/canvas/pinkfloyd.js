const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2000, 2000]
};

const sketch = () => {
  random.setSeed(12314213242);

  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).splice(0, colorCount);

  const bg = palette[0];
  const main = palette[1];

  return ({context, width, height}) => {
    context.fillStyle = bg;
    context.fillRect(0, 0, width, height);

    context.beginPath();
    context.arc(width / 2, height / 2, width / 3, 0, Math.PI * 2, false);
    context.strokeStyle = main;
    context.lineWidth = 40;
    context.stroke();
    context.closePath();

    context.fillStyle = main;
    context.fillRect(100, 100, width / 2, height / 2);

    // context.beginPath();
    // const gap = 150;
    // const yDisplacement = 0;
    // const left = width / 2 - gap;
    // const right = width / 2 + gap;
    // context.moveTo(left, right - yDisplacement);
    // context.lineTo(right, right - yDisplacement);
    // context.lineTo(left + gap, (right - gap) * Math.cos(Math.PI / 6));
    // context.closePath();
    //
    // // the fill color
    // context.fillStyle = main;
    // context.fill();

    // to be removed: for context
    // context.beginPath();
    // context.arc(width / 2, height / 2, 30, 0, Math.PI * 2, false);
    // context.strokeStyle = "white";
    // context.lineWidth = 20;
    // context.stroke();
    // context.closePath();
  };
};

canvasSketch(sketch, settings);
