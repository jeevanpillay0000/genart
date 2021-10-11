const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  // random.setSeed(12314213242);
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).splice(0, colorCount);

  const n = 5;
  const count = 2 ** n;
  const margin = 0;

  const createGrid = () => {
    let points = [];
    const color = "white";
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          position: [u, v],
          color: color
        });
      }
    }

    return points;
  };

  const grid = createGrid().filter(() => random.value() > 0.05);

  return ({context, width, height}) => {
    drawBackground(context, width, height);
    drawMaze(context, grid, width, height, margin, count);
    drawCircle(context, (width + height) / 16, width, height);
    drawEquilateralTriangle(context, (width + height) / 32, width, height);
  };
};

const drawBackground = (context, width, height) => {
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
};

const drawMaze = (context, grid, width, height, margin, count) => {
  grid.forEach(data => {
    const {position, color} = data;

    const [u, v] = position;

    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);
    const xs = count + 6;

    context.save();
    context.beginPath();

    if (random.value() > 0.5) {
      context.moveTo(x, y);
      context.lineTo(x + xs, y + xs);
    } else {
      context.moveTo(x + xs, y);
      context.lineTo(x, y + xs);
    }

    context.lineWidth = 10;
    context.strokeStyle = color;
    context.stroke();
    context.restore();
  });
};

const drawCircle = (context, size, width, height) => {
  context.save();
  context.beginPath();
  context.arc(width / 2, height / 2, size, 0, Math.PI * 2, false);
  context.fillStyle = "black";
  context.fill();
  context.closePath();
  context.restore();
};

const drawEquilateralTriangle = (context, side, width, height) => {
  var h = side * (Math.sqrt(3) / 2);

  context.save();
  context.translate(width / 2, height / 2);
  context.moveTo(0, -h / 2);
  context.lineTo(-side / 2, h / 2);
  context.lineTo(side / 2, h / 2);
  context.lineTo(0, -h / 2);
  context.lineWidth = 2;
  context.strokeStyle = "white";
  context.stroke();
  context.restore();
};

canvasSketch(sketch, settings);
