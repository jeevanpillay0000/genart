const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2048, 2048]
};

const sketch = () => {
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).splice(0, colorCount);
  const count = 50;

  const createGrid = () => {
    let points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const angle = (y / count) * Math.PI;
        points.push({
          color: random.pick(palette),
          position: [u, v],
          angle: angle
        });
      }
    }

    return points;
  };

  const points = createGrid().filter(() => random.value());
  const margin = 150;

  return ({context, width, height}) => {
    context.fillStyle = random.pick(palette);
    context.fillRect(0, 0, width, height);

    var res = 20;

    points.forEach(data => {
      const {position, angle} = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.translate(x, y);

      context.rotate(angle);
      context.beginPath();
      context.moveTo(0, 0);
      context.lineTo(res, 0);
      context.stroke();

      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
