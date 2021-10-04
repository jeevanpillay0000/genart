const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2000, 2000]
};

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).splice(0, colorCount);
  const fillType = [75, 100, 150];

  const createFill = () => {
    const count = random.pick(fillType);
    let fills = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = random.value();
        const v = random.value();

        const radius = random.value() * 10;

        fills.push({
          position: [u, v],
          radius
        });
      }
    }
    return fills;
  };

  const createGrid = () => {
    let points = [];

    const count = 3;
    const fill = createFill();

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push({
          position: [u, v],
          fill
        });
      }
    }

    return points;
  };

  const fills = createFill();
  const grid = createGrid();
  const margin = 200;

  return ({context, width, height}) => {
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

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
        context.strokeStyle = "black";
        context.stroke();
        context.closePath();
      });

      context.fillRect(0, 0, width, margin);
      context.fillRect(0, height - margin, width, margin);
      context.fillRect(0, margin, margin, width);
      context.fillRect(width - margin, margin, margin, width);

      // context.fillStyle = "black";
      // context.fillRect(x, y, width / 100, height / 100);
    });

    // fills.forEach(data => {
    //   const {position, radius} = data;
    //   const [u, v] = position;
    //   const x = lerp(margin, width - margin, u);
    //   const y = lerp(margin, height - margin, v);
    //
    //   context.beginPath();
    //   context.arc(x, y, radius, 0, Math.PI * 2, false);
    //   context.strokeStyle = "black";
    //   context.stroke();
    //   context.closePath();
    // });
    //
    // context.fillRect(0, 0, width, margin);
    // context.fillRect(0, height - margin, width, margin);
    // context.fillRect(0, margin, margin, width);
    // context.fillRect(width - margin, margin, margin, width);
  };
};

canvasSketch(sketch, settings);
