const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).splice(0, colorCount);
  const fillType = [15, 22, 35];

  const createFill = () => {
    const count = random.pick(fillType);
    let fills = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = random.value();
        const v = random.value();

        const radius = 0.1;

        fills.push({
          position: [u, v],
          radius
        });
      }
    }
    return fills;
  };

  const createGrid = fills => {
    let points = [];

    const count = 100;

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push({
          position: [u, v],
          fill: random.pick(fills)
        });
      }
    }

    return points;
  };

  const fills = createFill();
  const grid = createGrid(fills);
  const margin = 0;

  return ({context, width, height}) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    const fillers = [];

    grid.forEach(data => {
      const {position, fill} = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      fills.forEach(data => {
        const {position, radius} = data;
        const [u, v] = position;
        const x = lerp(margin, width - margin, u);
        const y = lerp(margin, height - margin, v);

        context.beginPath();
        context.arc(x, y, radius, 0, Math.PI * 2, false);
        context.stroke();
        context.closePath();
      });

      // context.fillStyle = "black";
      // context.fillRect(0, 0, x, margin);
      // context.fillRect(0, y - margin, x, margin);
      // context.fillRect(0, margin, margin, x);
      // context.fillRect(x - margin, margin, margin, x);
    });
  };
};

canvasSketch(sketch, settings);
