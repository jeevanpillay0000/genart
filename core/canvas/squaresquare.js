const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [2000, 2000]
};

const sketch = () => {
  // 12314213242
  random.setSeed(12314213242);
  const colorCount = random.rangeFloor(2, 4);
  const palette = random.shuffle(random.pick(palettes)).splice(0, colorCount);

  const createGrid = () => {
    const points = [];
    const count = 125;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const angle = Math.PI * 0.25;
        const radius = Math.abs(random.noise2D(u, v)) * 0.1;
        points.push({
          position: [u, v],
          angle: angle,
          color: random.pick(palette),
          radius
        });
      }
    }
    return points;
  };

  const margin = 10 ** 2;

  const points = createGrid();

  return ({context, width, height}) => {
    context.fillStyle = random.pick(palette);
    context.fillRect(0, 0, width, height);

    const shapes = ["-", "=", "l"];
    const embedd = width / margin / 4;
    const noise = 4;
    let growth = 2;
    let reduction = 1;
    for (var k = 0; k < embedd; k++) {
      const shape = random.pick(shapes);
      points.forEach(data => {
        const {position, angle, color, radius} = data;
        const [u, v] = position;

        const x = lerp(margin * reduction, width - margin * reduction, u);
        const y = lerp(margin * reduction, height - margin * reduction, v);

        context.save();
        context.translate(x, y);
        context.rotate(angle);
        context.beginPath();
        context.moveTo(0, 0);
        context.font = `${20}px "Arial"`;
        context.fillStyle = color;
        context.fillText(shape, 0, 0);
        context.fill();
        context.restore();
      });

      context.fillRect(
        margin * growth,
        margin * growth,
        width - margin * growth * 2,
        height - margin * growth * 2
      );

      growth += 2;
      reduction += 2; // change this for different outputs
    }
  };
};

canvasSketch(sketch, settings);
