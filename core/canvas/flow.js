const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1000, 1000]
};

const sketch = () => {
  // 12314213242
  random.setSeed(12314213242);
  const colorCount = random.rangeFloor(2, 4);
  const palette = random.shuffle(random.pick(palettes)).splice(0, colorCount);

  const COUNT = 125;
  const PARTITIONS = 1;
  const margin = 10 ** 2;

  const createGrid = () => {
    let points = [];
    for (let x = 0; x < COUNT; x++) {
      for (let y = 0; y < COUNT; y++) {
        const u = COUNT <= 1 ? 0.5 : x / (COUNT - 1);
        const v = COUNT <= 1 ? 0.5 : y / (COUNT - 1);
        const angle = PARTITIONS * (y / COUNT) * Math.PI;
        points.push({
          color: random.pick(palette),
          position: [u, v],
          angle: angle
        });
      }
    }

    return points;
  };

  const points = createGrid().filter(() => random.value() > 0.25);

  return ({context, width, height}) => {
    context.fillStyle = random.pick(palette);
    context.fillRect(0, 0, width, height);

    var res = 20;
    points.forEach(data => {
      const {position, angle, color} = data;
      const [u, v] = position;

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);
      context.save();
      context.translate(x, y);
      context.rotate(angle);
      context.beginPath();
      context.moveTo(0, 0);
      context.font = `${20}px "Helvetica"`;
      context.fillStyle = color;
      context.fillText("-", 0, 0);
      context.fill();
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);
