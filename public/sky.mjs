import { easeInOut } from './presentation.mjs';

const mix = (a, b, t) => a + (b - a) * t;
const clamp = (value, min, max) => Math.min(max, Math.max(min, value));
const seed = value => {
  const raw = Math.sin(value * 127.1 + 311.7) * 43758.5453123;
  return raw - Math.floor(raw);
};

export class Sky {
  constructor(canvas, mascot) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.mascot = mascot;
    this.phase = 'intro';
    this.depth = 0;
    this.target = 0;
    this.cameraDepth = 0;
    this.cameraTarget = 0;
    this.cameraJob = null;
    this.active = 0;
    this.targetActive = 0;
    this.time = 0;
    this.particles = [];
    this.fx = null;
    this.lowPower = false;
    this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    this.last = 0;
    this.mx = .72;
    this.my = .62;
    this.roundBase = 0;
    this.roundIndex = 0;
    this.sprites = {};
    for (const name of ['krill', 'krill-gold', 'schooler', 'rare', 'deepcut', 'tooclever', 'evil']) {
      const image = new Image();
      image.src = '/assets/' + name + '.svg';
      this.sprites[name] = image;
    }
    this.resize();
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(canvas);
    requestAnimationFrame(time => this.tick(time));
  }

  layout() {
    const mobile = this.w < 700;
    const rail = this.w >= 1200 ? 180 : 0;
    const bottom = mobile ? 50 : 90;
    return { mobile, rail, bottom, height: this.h - bottom, left: rail, width: this.w - rail * 2, center: this.w / 2 };
  }

  resize() {
    const previousHeight = this.h;
    const previousWidth = this.w;
    this.w = this.canvas.clientWidth;
    this.h = this.canvas.clientHeight;
    this.canvas.width = Math.max(1, Math.ceil(this.w / 2));
    this.canvas.height = Math.max(1, Math.ceil(this.h / 2));
    this.ctx.setTransform(.5, 0, 0, .5, 0, 0);
    this.ctx.imageSmoothingEnabled = false;
    if (previousHeight && (previousHeight !== this.h || previousWidth !== this.w) && ['preview', 'answering'].includes(this.phase)) {
      this.cameraDepth = this.cameraTarget = this.roundBase || 0;
      this.cameraJob = null;
    }
    this.draw();
  }

  moveCamera(to, duration = 1800, ease = easeInOut) {
    this.cameraTarget = to;
    this.cameraJob = { from: this.cameraDepth, to, start: performance.now(), duration: this.reduced ? 1 : duration, ease };
  }

  setPhase(phase) {
    this.phase = phase;
    this.targetActive = phase === 'intro' || phase === 'done' ? 0 : 1;
    if (phase === 'intro') this.moveCamera(0, 700);
  }

  setDepth(value) {
    this.target = value;
    if (!['plunge', 'surface'].includes(this.phase)) {
      this.depth = value;
      if (this.phase === 'landed') this.moveCamera(value - 25, 500);
    }
  }

  round(depth) {
    this.target = depth;
    this.depth = depth;
    this.fx = null;
    this.roundBase = depth;
    this.moveCamera(depth + 35, 1800);
  }

  drop(oldDepth, result, progress) {
    this.cameraJob = null;
    const target = oldDepth + result.score * 10;
    this.fx = { tier: result.tier, progress, startDepth: oldDepth, resultDepth: target };
    const eased = result.tier === 'grounded' ? (1 - Math.cos(Math.PI * progress)) / 2 : easeInOut(progress);
    this.cameraDepth = mix(oldDepth + 35, target + 25, eased);
    this.cameraTarget = target + 25;
    this.depth = mix(oldDepth, target, eased);
    this.target = target;
  }

  typeAt(x, y, count = 2) {
    if (this.reduced) return;
    for (let i = 0; i < count; i += 1) {
      this.particles.push({
        x: x + (Math.random() - .5) * 8,
        y: y + Math.random() * 10,
        vx: (Math.random() - .5) * 8,
        vy: -30 - Math.random() * 20,
        life: 1,
        color: '#e8f7ff',
        bubble: true,
        r: 1 + Math.random() * 2
      });
    }
  }

  burst(color = '#ffd166', count = 30) {
    if (this.reduced) return;
    const layout = this.layout();
    for (let i = 0; i < (this.lowPower ? count / 3 : count); i += 1) {
      this.particles.push({
        x: layout.center,
        y: layout.height * .48,
        vx: (Math.random() - .5) * 220,
        vy: (Math.random() - .5) * 220 - 35,
        life: 1,
        color,
        bubble: false
      });
    }
  }

  tick(now) {
    const dt = Math.min(.05, (now - this.last) / 1000 || .016);
    if (!document.hidden && (!this.lowPower || now - this.last >= 50)) {
      this.dt = dt;
      this.last = now;
      this.time += this.reduced ? 0 : dt;
      if (this.cameraJob) {
        const job = this.cameraJob;
        const progress = clamp((now - job.start) / job.duration, 0, 1);
        this.cameraDepth = mix(job.from, job.to, job.ease(progress));
        if (progress === 1) this.cameraJob = null;
      }
      this.active = mix(this.active, this.targetActive, 1 - Math.exp(-3.6 * dt));
      for (const particle of this.particles) {
        particle.x += particle.vx * dt;
        particle.y += particle.vy * dt;
        if (!particle.bubble) particle.vy += 80 * dt;
        particle.life -= dt * .65;
      }
      this.particles = this.particles.filter(particle => particle.life > 0);
      this.draw();
    }
    requestAnimationFrame(time => this.tick(time));
  }

  cloud(x, y, scale = 1) {
    const c = this.ctx;
    const blocks = [
      [0, 5, 7, 2], [2, 3, 9, 3], [5, 1, 7, 5], [9, 0, 6, 5],
      [13, 2, 6, 4], [17, 4, 6, 2], [2, 7, 17, 1]
    ];
    c.fillStyle = '#f4fbff';
    for (const [a, b, width, height] of blocks) c.fillRect(Math.round(x + a * scale), Math.round(y + b * scale), width * scale, height * scale);
    c.fillStyle = '#c4e7f6';
    for (const [a, b, width, height] of [[2, 7, 5, 1], [7, 6, 5, 1], [13, 7, 4, 1]]) {
      c.fillRect(Math.round(x + a * scale), Math.round(y + b * scale), width * scale, height * scale);
    }
  }

  tree(x, base, height, shade = 0) {
    const c = this.ctx;
    const trunk = Math.max(5, Math.round(height * .09));
    const crown = height * .76;
    const greens = ['#1b694d', '#277a56', '#32885d', '#14533f'];
    const green = greens[shade % greens.length];
    c.fillStyle = '#62452f';
    c.fillRect(Math.round(x - trunk / 2), Math.round(base - height * .3), trunk, height * .34);
    c.fillStyle = green;
    const layers = [
      [0, crown * .05, height * .28], [0, crown * .25, height * .36],
      [0, crown * .47, height * .43], [0, crown * .68, height * .5]
    ];
    for (const [unused, y, width] of layers) {
      c.fillRect(Math.round(x - width / 2), Math.round(base - crown + y), Math.round(width), Math.max(7, Math.round(crown * .22)));
    }
    c.fillStyle = '#3b9b67';
    c.fillRect(Math.round(x - height * .08), Math.round(base - height * .84), Math.round(height * .16), Math.round(height * .13));
    c.fillRect(Math.round(x - height * .19), Math.round(base - height * .62), Math.round(height * .12), Math.round(height * .08));
    c.fillRect(Math.round(x + height * .08), Math.round(base - height * .55), Math.round(height * .12), Math.round(height * .08));
  }

  balloon(x, y, color, scale = 1) {
    const c = this.ctx;
    c.save();
    c.translate(Math.round(x), Math.round(y));
    c.scale(scale, scale);
    c.fillStyle = color;
    c.fillRect(-6, -14, 12, 17);
    c.fillRect(-9, -10, 18, 10);
    c.fillRect(-4, -18, 8, 4);
    c.fillRect(-2, 3, 4, 3);
    c.strokeStyle = '#e8f1ffcc';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(0, 6);
    c.lineTo(0, 26);
    c.stroke();
    c.fillStyle = '#ffffff55';
    c.fillRect(-4, -12, 2, 6);
    c.restore();
  }

  stars(altitude) {
    const c = this.ctx;
    const amount = this.lowPower ? 55 : 130;
    const alpha = clamp((altitude - 10500) / 10000, 0, 1);
    if (alpha <= 0) return;
    for (let i = 0; i < amount; i += 1) {
      const x = seed(i + 41) * this.w;
      const y = seed(i + 91) * this.h;
      const twinkle = .3 + .7 * Math.abs(Math.sin(this.time * (1 + seed(i + 4) * 2) + i));
      c.globalAlpha = alpha * twinkle;
      c.fillStyle = i % 9 === 0 ? '#ffe5a1' : '#e5f4ff';
      c.fillRect(Math.round(x), Math.round(y), i % 13 === 0 ? 3 : 2, i % 13 === 0 ? 3 : 2);
    }
    c.globalAlpha = 1;
  }

  forest(worldY, layout) {
    const c = this.ctx;
    const ground = worldY(0);
    if (ground < -180 || ground > this.h + 220) return;
    const hillY = ground - 42;
    c.fillStyle = '#5b9c62';
    c.beginPath();
    c.moveTo(0, hillY + 25);
    for (let x = 0; x <= this.w + 12; x += 12) c.lineTo(x, hillY + Math.sin(x * .009) * 18 + Math.sin(x * .023) * 8);
    c.lineTo(this.w, ground + 60);
    c.lineTo(0, ground + 60);
    c.closePath();
    c.fill();
    c.fillStyle = '#2e764f';
    c.fillRect(0, ground + 8, this.w, Math.max(0, this.h - ground));
    c.fillStyle = '#8fc96a';
    for (let i = 0; i < 90; i += 1) {
      const x = seed(i + 18) * this.w;
      const y = ground + 10 + seed(i + 77) * 70;
      if (y < this.h) c.fillRect(Math.round(x), Math.round(y), 3, 2);
    }
    const count = layout.mobile ? 7 : 13;
    for (let i = 0; i < count; i += 1) {
      const x = seed(i + 102) * this.w;
      const height = 105 + seed(i + 202) * (layout.mobile ? 80 : 150);
      const base = ground + 15 + seed(i + 302) * 15;
      if (base - height < this.h + 80 && base > -80) this.tree(x, base, height, i);
    }
    const pondX = this.w * .43;
    const pondY = ground - 15;
    if (pondY < this.h + 40 && pondY > -60) {
      c.fillStyle = '#327e9a';
      c.fillRect(pondX, pondY, this.w * .27, 24);
      c.fillStyle = '#7bd3d4';
      c.fillRect(pondX + 12, pondY + 4, this.w * .19, 3);
      c.fillStyle = '#1b596f';
      c.fillRect(pondX + 22, pondY + 17, this.w * .17, 3);
      c.fillStyle = '#c5e98c';
      c.fillRect(pondX - 8, pondY - 4, this.w * .3, 4);
    }
    c.fillStyle = '#b4df83';
    for (let i = 0; i < 26; i += 1) {
      const x = seed(i + 504) * this.w;
      const y = ground - 4 + seed(i + 604) * 18;
      c.fillRect(Math.round(x), Math.round(y), 2, 4);
    }
  }

  mountains(worldY) {
    const c = this.ctx;
    for (let index = 0; index < 4; index += 1) {
      const altitude = 900 + index * 1250;
      const y = worldY(altitude);
      if (y < -180 || y > this.h + 180) continue;
      const shift = (index % 2 ? 1 : -1) * (this.time * (4 + index * 2) % 80);
      c.fillStyle = ['#8bb4b4', '#729a9f', '#587e8e', '#45687d'][index];
      c.beginPath();
      c.moveTo(0, y + 110);
      for (let x = -80; x <= this.w + 80; x += 80) {
        const peak = y - 20 - seed(index * 20 + x + 9) * (90 + index * 16);
        c.lineTo(x + shift, peak);
        c.lineTo(x + 42 + shift, y + 20);
      }
      c.lineTo(this.w, y + 150);
      c.lineTo(0, y + 150);
      c.closePath();
      c.fill();
    }
  }

  clouds(worldY, layout) {
    const altitudes = [650, 1450, 2600, 3900, 5400, 7200, 9200, 11800];
    for (let i = 0; i < altitudes.length; i += 1) {
      const y = worldY(altitudes[i]) + Math.sin(this.time * .35 + i) * 8;
      if (y < -100 || y > this.h + 100) continue;
      const scale = (layout.mobile ? 2.1 : 3.1) * (0.7 + seed(i + 5) * .55);
      const x = ((seed(i + 70) * this.w + this.time * (5 + i * 2)) % (this.w + 180)) - 90;
      this.cloud(x, y, scale);
      if (i % 2 === 0) this.cloud(this.w - x - 80, y + 45, scale * .65);
    }
  }

  space(altitude, layout) {
    if (altitude < 28000) return;
    const c = this.ctx;
    const alpha = clamp((altitude - 28000) / 16000, 0, 1);
    c.globalAlpha = alpha;
    const earthY = this.h * .83 + (altitude - 28000) * .002;
    if (earthY > -100 && earthY < this.h + 200) {
      c.fillStyle = '#214e82';
      c.beginPath();
      c.ellipse(this.w * .52, earthY, this.w * .55, 72, 0, Math.PI, Math.PI * 2);
      c.fill();
      c.fillStyle = '#4f9b72';
      c.beginPath();
      c.ellipse(this.w * .35, earthY - 22, this.w * .17, 18, -.15, Math.PI, Math.PI * 2);
      c.fill();
      c.fillStyle = '#b9e6ff';
      c.fillRect(0, earthY - 4, this.w, 3);
    }
    c.fillStyle = '#e7e4ff';
    const moonX = this.w * .78;
    const moonY = this.h * .18;
    c.fillRect(moonX - 15, moonY - 15, 30, 30);
    c.fillRect(moonX - 21, moonY - 7, 42, 14);
    c.fillStyle = '#a6a7d2';
    c.fillRect(moonX - 6, moonY - 5, 7, 6);
    c.fillRect(moonX + 5, moonY + 4, 5, 5);
    c.globalAlpha = 1;
    this.stars(altitude);
  }

  drawEffect(layout) {
    const c = this.ctx;
    const tier = this.fx?.tier || 'miss';
    const progress = this.fx?.progress || 0;
    const x = layout.center;
    const y = layout.height * .48;
    const color = tier === 'skyhigh' ? '#ffd166' : tier === 'cloud' ? '#8ce7ff' : tier === 'kite' ? '#8be0b0' : '#ff9f72';
    const glow = c.createRadialGradient(x, y, 8, x, y, tier === 'skyhigh' ? 260 : 150);
    glow.addColorStop(0, color + '55');
    glow.addColorStop(1, color + '00');
    c.fillStyle = glow;
    c.fillRect(x - 270, y - 270, 540, 540);
    if (tier === 'skyhigh') {
      for (let i = 0; i < 28; i += 1) {
        const angle = this.time * (i % 2 ? 1 : -1) + i * 2.4;
        const radius = 45 + seed(i + 8) * 155;
        const px = x + Math.cos(angle) * radius;
        const py = y + Math.sin(angle) * radius * .55;
        c.fillStyle = '#ffe6a2';
        c.fillRect(Math.round(px), Math.round(py), 3, 3);
      }
    }
    if (progress > .4 && tier !== 'miss') {
      c.globalAlpha = .4;
      c.fillStyle = color;
      for (let i = 0; i < 14; i += 1) {
        const px = x + Math.sin(i * 4 + this.time * 2) * (35 + i * 5);
        const py = y + Math.cos(i * 3 + this.time * 2) * (20 + i * 3);
        c.fillRect(Math.round(px), Math.round(py), 3, 3);
      }
      c.globalAlpha = 1;
    }
  }

  draw() {
    if (!this.ctx || !this.w || !this.h) return;
    const c = this.ctx;
    const w = this.w;
    const h = this.h;
    const time = this.time;
    const layout = this.layout();
    const altitude = Math.max(0, -this.cameraDepth);
    const worldY = value => layout.height * .68 + (altitude - value) * .04;

    let top = '#8fd7f4';
    let middle = '#c5efff';
    let horizon = '#f6e5b6';
    if (altitude > 6500 && altitude <= 15000) {
      top = '#ee9b85'; middle = '#b987aa'; horizon = '#52648e';
    } else if (altitude > 15000 && altitude <= 28000) {
      top = '#354878'; middle = '#172a55'; horizon = '#101b3b';
    } else if (altitude > 28000) {
      top = '#05091d'; middle = '#080f2a'; horizon = '#030613';
    }

    const sky = c.createLinearGradient(0, 0, 0, h);
    sky.addColorStop(0, top);
    sky.addColorStop(.62, middle);
    sky.addColorStop(1, horizon);
    c.fillStyle = sky;
    c.fillRect(0, 0, w, h);

    if (altitude < 12000) {
      const sunX = w * .78;
      const sunY = h * .2 + Math.sin(time * .08) * 7;
      c.fillStyle = altitude > 6500 ? '#ffca91' : '#ffe89b';
      c.fillRect(sunX - 24, sunY - 24, 48, 48);
      c.fillRect(sunX - 32, sunY - 12, 64, 24);
      c.fillStyle = '#fff4bd';
      c.fillRect(sunX - 12, sunY - 30, 24, 60);
    }

    this.stars(altitude);
    this.mountains(worldY);
    this.clouds(worldY, layout);
    this.forest(worldY, layout);
    this.space(altitude, layout);

    const birdsY = worldY(850);
    if (altitude < 10000 && birdsY > -80 && birdsY < h + 80) {
      for (let i = 0; i < (layout.mobile ? 4 : 8); i += 1) {
        const x = ((seed(i + 800) * w + time * (10 + i * 2)) % (w + 80)) - 40;
        const y = birdsY - 20 - seed(i + 900) * 80 + Math.sin(time + i) * 6;
        c.fillStyle = '#274e63';
        c.fillRect(Math.round(x), Math.round(y), 8, 2);
        c.fillRect(Math.round(x + 7), Math.round(y - 3), 5, 2);
      }
    }

    const currentGround = worldY(0);
    const targetAltitude = Math.max(0, -this.target);
    const rulerX = w - layout.rail - 14;
    c.strokeStyle = '#28496a99';
    c.fillStyle = '#25445e';
    c.lineWidth = 1;
    c.beginPath();
    c.moveTo(rulerX, 30);
    c.lineTo(rulerX, layout.height);
    c.stroke();
    const maxAltitude = Math.max(7000, Math.ceil((altitude + 2500) / 1000) * 1000);
    for (let mark = 0; mark <= maxAltitude; mark += 1000) {
      const y = worldY(mark);
      if (y < 0 || y > layout.height) continue;
      const size = mark % 5000 === 0 ? 13 : 6;
      c.beginPath();
      c.moveTo(rulerX - size, y);
      c.lineTo(rulerX, y);
      c.stroke();
      if (mark % 5000 === 0 && mark > 0) {
        c.font = '14px VT323';
        c.textAlign = 'right';
        c.fillText((mark / 1000) + 'km', rulerX - size - 4, y + 4);
      }
    }

    const landmarks = [
      [0, 'FOREST CANOPY', 'L'],
      [1800, 'CLOUD BASE', 'R'],
      [4200, 'MOUNTAIN LINE', 'L'],
      [7200, 'HIGH CLOUDS', 'R'],
      [12000, 'STRATOSPHERE', 'L'],
      [30000, 'EDGE OF SPACE', 'R'],
      [50000, 'MOON ORBIT', 'L']
    ];
    c.font = (layout.mobile ? 13 : 17) + 'px VT323';
    c.fillStyle = 'rgba(23, 54, 76, .72)';
    for (const [mark, label, side] of landmarks) {
      const y = worldY(mark);
      if (y < 75 || y > layout.height - 75 || ['intro', 'done'].includes(this.phase)) continue;
      c.textAlign = side === 'L' ? 'left' : 'right';
      c.fillText(side === 'L' ? '— ' + label : label + ' —', side === 'L' ? layout.left + 18 : rulerX - 25, y);
    }
    c.textAlign = 'left';

    if (this.fx && (this.phase === 'plunge' || (this.phase === 'landed' && this.fx.tier === 'skyhigh'))) this.drawEffect(layout);

    for (const particle of this.particles) {
      c.globalAlpha = particle.life;
      if (particle.bubble) {
        c.strokeStyle = 'rgba(240, 250, 255, ' + (particle.life * .7) + ')';
        c.beginPath();
        c.arc(particle.x, particle.y, particle.r || 2, 0, Math.PI * 2);
        c.stroke();
      } else {
        c.fillStyle = particle.color;
        c.fillRect(particle.x, particle.y, 3, 4);
      }
    }
    c.globalAlpha = 1;

    const groundFade = clamp((currentGround - h * .52) / 180, 0, 1);
    const fadeStart = this.phase === 'intro' ? Math.max(0, currentGround - 360) : h - 90;
    const fade = c.createLinearGradient(0, fadeStart, 0, Math.min(h, fadeStart + 120));
    fade.addColorStop(0, 'rgba(5, 10, 20, 0)');
    fade.addColorStop(.65, 'rgba(5, 10, 20, ' + (this.phase === 'intro' ? .12 + groundFade * .2 : .78) + ')');
    fade.addColorStop(1, 'rgba(5, 10, 20, .96)');
    c.fillStyle = fade;
    c.fillRect(0, fadeStart, w, h - fadeStart);

    const hero = document.getElementById('hero');
    if (hero) {
      hero.style.top = Math.max(40, currentGround - 360) + 'px';
      hero.style.opacity = ['intro', 'done'].includes(this.phase) ? '1' : this.phase === 'preview' ? '.32' : '0';
    }
    if (['preview', 'answering', 'plunge'].includes(this.phase)) {
      const card = document.getElementById('prompt-card');
      if (card) card.style.top = '23.5%';
    }
    if (this.phase === 'plunge') {
      document.querySelectorAll('.tier-line').forEach(line => {
        const mark = Math.max(0, -this.fx.startDepth + Number(line.dataset.score) * 10);
        line.style.top = worldY(mark) + 'px';
      });
    }
    const landing = document.getElementById('landing');
    if (landing && this.phase === 'landed') {
      landing.style.top = clamp(worldY(targetAltitude) - 125, 100, layout.height * .43) + 'px';
    }

    let target;
    if (this.phase === 'intro') target = { x: layout.left + layout.width * .73, y: Math.min(layout.height * .77, currentGround - 88) };
    else if (this.phase === 'done') target = { x: layout.left + layout.width * .82, y: layout.height * .16 };
    else if (this.phase === 'landed' && this.fx?.tier === 'skyhigh') target = { x: layout.center, y: clamp(worldY(targetAltitude) - 70, 90, layout.height * .72) };
    else if (this.phase === 'landed') target = { x: layout.left + layout.width * .18, y: layout.height * .28 };
    else if (this.phase === 'plunge') target = { x: Math.min(layout.center + 95, w - layout.rail - 44), y: layout.height / 2 - 74 };
    else target = { x: layout.left + 48, y: layout.height - 168 };

    const follow = 1 - Math.exp(-2.6 * (this.dt || .016));
    this.mx = mix(this.mx * w, target.x, follow) / w;
    this.my = mix(this.my * h, target.y, follow) / h;
    const mascotX = this.mx * w;
    const mascotY = this.my * h;

    this.balloon(mascotX - 22, mascotY - 63 + Math.sin(time * 1.4) * 3, '#ff6b98', .9);
    this.balloon(mascotX + 1, mascotY - 76 + Math.sin(time * 1.2 + 1) * 3, '#ffd166', .82);
    this.balloon(mascotX + 23, mascotY - 60 + Math.sin(time * 1.5 + 2) * 3, '#58d8e8', .88);

    const mascotSize = this.phase === 'landed' && this.fx?.tier === 'skyhigh' ? (layout.mobile ? 66 : 88) : 64;
    this.mascot.style.width = mascotSize + 'px';
    this.mascot.style.height = mascotSize + 'px';
    this.mascot.style.left = (mascotX - mascotSize / 2) + 'px';
    this.mascot.style.top = (mascotY - mascotSize / 2) + 'px';
    this.mascot.style.transform = 'none';
  }
}
