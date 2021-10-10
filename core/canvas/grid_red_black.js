const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  const n = 6;
  const count = 2 ** n;

  const createGrid = () => {
    let points = [];

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        // hsl(0, 100%, 50%)
        const color =
          // Math.abs(random.noise2D(u, v)) * 5 > 0.125
          random.value() > 0.9 ? `hsl(${328}, ${85}%, ${60}%)` : `#343a40`;

        points.push({
          position: [u, v],
          color: color
        });
      }
    }

    return points;
  };

  const grid = createGrid().filter(() => random.value() > 0.05);
  const margin = 100;

  return ({context, width, height}) => {
    context.fillStyle = "black";
    context.fillRect(0, 0, width, height);

    grid.forEach(data => {
      const {position, color} = data;

      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color;
      context.fillRect(x, y, n, n);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
