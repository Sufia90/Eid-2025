// CANVAS STARFIELD
const canvas = document.getElementById('bgCanvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = Array.from({ length: 160 }, () => ({
  x:     Math.random() * window.innerWidth,
  y:     Math.random() * window.innerHeight,
  r:     Math.random() * 1.4 + 0.3,
  speed: Math.random() * 0.5 + 0.2,
  phase: Math.random() * Math.PI * 2,
  color: ['#ffffff','#ffe8b0','#c8d8ff','#ffd700'][Math.floor(Math.random()*4)]
}));

function animateStars(time) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(star => {
    const opacity = 0.2 + 0.8 * Math.abs(Math.sin(time * 0.001 * star.speed + star.phase));
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = star.color;
    ctx.globalAlpha = opacity;
    ctx.fill();
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(animateStars);
}
requestAnimationFrame(animateStars);

// FIREWORKS
const sparkColors = ['#ffe066','#ff5555','#55ff99','#00ffe0','#ff88cc','#ffaa33','#ffffff'];
const card = document.getElementById('card');

const fwConfigs = [
  { id:'fw1', style:'top:55px; left:45px;' },
  { id:'fw2', style:'top:55px; right:45px;' },
  { id:'fw3', style:'top:42%; left:18px;' },
  { id:'fw4', style:'top:42%; right:18px;' },
  { id:'fw5', style:'bottom:160px; left:55px;' },
  { id:'fw6', style:'bottom:160px; right:55px;' },
  { id:'fw7', style:'top:25%; left:30px;' },
  { id:'fw8', style:'top:25%; right:30px;' },
];

fwConfigs.forEach((cfg, fi) => {
  const fw = document.getElementById(cfg.id);
  fw.style.cssText = cfg.style;
  for (let i = 0; i < 16; i++) {
    const spark = document.createElement('div');
    spark.className = 'spark';
    const angle = (i / 16) * 360;
    const dist  = 30 + Math.random() * 35;
    const tx    = Math.cos(angle * Math.PI / 180) * dist;
    const ty    = Math.sin(angle * Math.PI / 180) * dist;
    const color    = sparkColors[Math.floor(Math.random() * sparkColors.length)];
    const duration = (1.0 + Math.random() * 0.9).toFixed(2);
    const delay    = (fi * 0.35 + Math.random() * 0.6).toFixed(2);
    const size     = (2 + Math.random() * 3).toFixed(1);
    spark.style.cssText = `
      width:${size}px; height:${size}px;
      background:${color};
      --tx:${tx}px; --ty:${ty}px;
      --dur:${duration}s; --delay:${delay}s;
      box-shadow:0 0 5px ${color}, 0 0 10px ${color};
      animation-delay:${delay}s;
      animation-duration:${duration}s;
    `;
    fw.appendChild(spark);
  }
});

// FLOATING PARTICLES
const particleColors = ['#ffe066','#ffffff','#00ffe0','#ff88cc','#aaaaff'];
for (let i = 0; i < 18; i++) {
  const p = document.createElement('div');
  const size  = (1.5 + Math.random() * 3).toFixed(1);
  const color = particleColors[Math.floor(Math.random() * particleColors.length)];
  p.style.cssText = `
    position:absolute; width:${size}px; height:${size}px;
    background:${color}; border-radius:50%;
    left:${(5 + Math.random()*90).toFixed(1)}%;
    bottom:${(10 + Math.random()*70).toFixed(1)}%;
    z-index:4; pointer-events:none;
    box-shadow:0 0 6px ${color}; opacity:0;
    animation:floatUp ${(4+Math.random()*6).toFixed(1)}s ease-in infinite ${(Math.random()*6).toFixed(1)}s;
  `;
  card.appendChild(p);
}

const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    0%   { transform:translateY(0) scale(1);      opacity:0; }
    15%  { opacity:0.9; }
    80%  { opacity:0.4; }
    100% { transform:translateY(-120px) scale(0.3); opacity:0; }
  }
`;
document.head.appendChild(style);