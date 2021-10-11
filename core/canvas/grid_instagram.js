const canvasSketch = require("canvas-sketch");
const {lerp} = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes");

const settings = {
  dimensions: [1080, 1080]
};

const sketch = () => {
  random.setSeed(12314213242);
  const colorCount = random.rangeFloor(2, 6);
  const palette = random.shuffle(random.pick(palettes)).splice(0, colorCount);

  const n = 5;
  const margin = 25;

  const createBackgroundGrid = () => {
    let points = [];
    const count = 4;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const color = "black";
        // const color = random.pick(palette);
        points.push({
          position: [u, v],
          color: color
        });
      }
    }

    return points;
  };

  const createMainGrid = () => {
    count = 50;
    let points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const color = random.pick(palette);
        const radius = Math.abs(random.noise2D(u * 0.005, v * 0.005));
        const rotation = Math.abs(random.noise2D(u * 0.005, v * 0.005));
        points.push({
          position: [u, v],
          color: color,
          radius: radius,
          rotation: rotation
        });
      }
    }

    return points;
  };

  const backgroundGrid = createBackgroundGrid();
  const mainGrid = createMainGrid();
  // .filter(() => random.value() > 0.1);

  return ({context, width, height}) => {
    drawBackground(context, width, height);

    const squareDiameter = width / 3;
    const circleRadius = Math.sqrt(squareDiameter ** 2 * 2) / 2;

    drawGrid(context, backgroundGrid, width, height, 0, squareDiameter);
    drawMainGrid(context, mainGrid, width, height, margin, width / 19);
    drawCircle(context, circleRadius, width, height);
  };
};

const drawMainGrid = (context, grid, width, height, margin, size) => {
  grid.forEach(data => {
    const {position, color, radius, rotation} = data;

    const [u, v] = position;

    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);
    context.save();

    context.translate(x, y);
    context.beginPath();
    context.moveTo(0, 0);
    context.font = `${8}px "Arial"`;
    context.fillStyle = "#9C9D9C";
    context.fillText("-", 0, 0);
    context.fill();
    context.restore();
  });
};

const drawGrid = (context, grid, width, height, margin, size) => {
  grid.forEach(data => {
    const {position, color} = data;

    const [u, v] = position;

    const x = lerp(margin, width - margin, u);
    const y = lerp(margin, height - margin, v);

    context.save();
    context.fillStyle = color;
    context.fillRect(x, y, size, size);
    context.restore();
  });
};

const drawBackground = (context, width, height) => {
  context.fillStyle = "black";
  context.fillRect(0, 0, width, height);
};

const drawCircle = (context, size, width, height) => {
  context.save();
  context.beginPath();
  context.arc(width / 2, height / 2, size, 0, Math.PI * 2, false);
  context.fillStyle = "#9C9D9C";
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
