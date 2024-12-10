const canvas = document.getElementById('graph');
const ctx = canvas.getContext('2d');
const slider = document.getElementById('k-slider');
const kValueDisplay = document.getElementById('k-value');

const width = canvas.width;
const height = canvas.height;

const xScale = 100; 
const yScale = 100; 

const centerX = width / 2;
const centerY = height / 2;

function drawAxes() {
  ctx.beginPath();
  ctx.strokeStyle = 'gray';

  // X ekseni
  ctx.moveTo(0, centerY);
  ctx.lineTo(width, centerY);

  // Y ekseni
  ctx.moveTo(centerX, 0);
  ctx.lineTo(centerX, height);

  ctx.stroke();
}

function plotFunction(fn, color = 'blue', k = 1) {
  ctx.beginPath();
  ctx.strokeStyle = color;

  for (let x = -1.7; x <= 1.7; x += 0.01) {
    const y = fn(x, k); 
    if (isNaN(y)) continue; 

    const canvasX = centerX + x * xScale;
    const canvasY = centerY - y * yScale; 

    if (x === -1.7) {
      ctx.moveTo(canvasX, canvasY); 
    } else {
      ctx.lineTo(canvasX, canvasY); 
    }
  }

  ctx.stroke();
}

function myFunction(x, k) {
  const term1 = Math.cbrt(x ** 2); // x^(2/3)
  const term2 = 0.9 * Math.sin(k * x); // 0.9 * sin(kx)
  const sqrtTerm = Math.sqrt(3 - x ** 2); // sqrt(3 - x^2)
  return term1 + term2 * sqrtTerm;
}

function clearCanvas() {
  ctx.clearRect(0, 0, width, height);
}

slider.addEventListener('input', () => {
  const k = slider.value / 1; 
  kValueDisplay.textContent = k.toFixed(1); 
  clearCanvas(); 
  drawAxes();
  plotFunction(myFunction, 'red', k);
});

drawAxes();
plotFunction(myFunction, 'red', 0);
