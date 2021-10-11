const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  random.setSeed(12314213242);
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).splice(0, colorCount);

  const n = 5;
  const count = 2 ** n;
  const margin = 100;

  const createGrid = () => {
    let points = [];
    const color = random.pick(palette);
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const angle = Math.abs(random.noise2D(u, v)) * 2;
        points.push({
          position: [u, v],
          color: color,
          angle: angle
        });
      }
    }

    return points;
  };

  const grid = createGrid();
  // .filter(() => random.value() > 0.05);

  return ({context, width, height}) => {
    drawBackground(context, width, height);
    drawGrid(context, grid, margin, width, height);
  };
};

const drawBackground = (context, width, height) => {
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
};

const drawGrid = (context, grid, margin, width, height) => {
  grid.forEach(data => {
    const {position, angle, color} = data;
    const [u, v] = position;

    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);

    context.save();
    context.translate(x, y);
    context.rotate(angle);
    context.beginPath();
    context.moveTo(0, 0);
    context.font = `${30}px "Helvetica"`;
    context.fillStyle = color;
    context.fillText("-", 0, 0);
    context.fill();
    context.restore();
  });
};

canvasSketch(sketch, settings);
