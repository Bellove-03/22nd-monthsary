/* =========================================================
   MONTHSARY LOVE LETTER · script.js  (romantic edition)
   EDIT THE CONFIG BLOCK: your words go here
   ========================================================= */
const CONFIG = {
  title: "Happy one year and eleven months",
  name: "my love",
  tagline: "Every day with you is my favorite chapter.",
  greeting: "My dearest love,",
  message: [
    "Hey babyy happy 22nd monthsary, I just want to tell you how thankful I am for having you in my life. I will always be glad of the decision that I made for pursuing you again baby. Because of how much you mean to me right now.",
    "I hope that no matter how lacking I am right now, you'll still stay at my side and continue to love me. I promise to always try and strive better for our relationship and our future.",
    "Let's be together forever and always, and I hope to grown old and also to grow as a person with you. I love you so much baby, and I hope that you'll always be happy with me. I will always be here for you, and I will always love you.",
  ],
  signoff: "Forever yours ♥",
  typeSpeed: 26   // milliseconds per letter in the letter (0 = show instantly)
};
/* ========================================================= */

const $ = (id) => document.getElementById(id);
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- screens ---------- */
const order = ["s-intro", "s-flowers", "s-env", "s-sad", "s-msg"];
const step = { "s-intro": 0, "s-flowers": 0, "s-env": 1, "s-sad": 1, "s-msg": 2 };
let typer = null;

function show(id) {
  order.forEach((s) => $(s).classList.toggle("on", s === id));
  document.querySelectorAll(".progress i").forEach((d, i) => d.classList.toggle("on", i === step[id]));
  if (id === "s-msg") typeMessage(); else stopTyping();
}

/* ---------- text ---------- */
const words = CONFIG.title.split(/\s+/);
$("t-title").innerHTML = words
  .map((_, i) => `<span class="w" style="animation-delay:${(0.15 + i * 0.16).toFixed(2)}s"></span>`)
  .join(" ");
[...$("t-title").querySelectorAll(".w")].forEach((el, i) => (el.textContent = words[i]));
$("t-name").textContent = CONFIG.name;
$("t-tagline").textContent = CONFIG.tagline;

const lines = [CONFIG.greeting, ...CONFIG.message, CONFIG.signoff];
$("note").innerHTML = lines
  .map((_, i) => (i === 0 ? '<div class="to"></div>' : i === lines.length - 1 ? '<p class="from"></p>' : "<p></p>"))
  .join("");
const noteEls = [...$("note").children];

function stopTyping() { if (typer) { clearTimeout(typer); typer = null; } }
function typeMessage() {
  stopTyping();
  noteEls.forEach((el) => { el.textContent = ""; el.classList.remove("caret"); });
  $("note").scrollTop = 0;
  if (reduce || !CONFIG.typeSpeed) { noteEls.forEach((el, i) => (el.textContent = lines[i])); return; }
  let line = 0, ch = 0;
  const tick = () => {
    const el = noteEls[line];
    el.classList.add("caret");
    ch++;
    el.textContent = lines[line].slice(0, ch);
    $("note").scrollTop = $("note").scrollHeight;
    if (ch >= lines[line].length) {
      el.classList.remove("caret");
      line++; ch = 0;
      if (line >= lines.length) { typer = null; return; }
    }
    typer = setTimeout(tick, CONFIG.typeSpeed);
  };
  tick();
}
$("note").addEventListener("click", () => {
  if (!typer) return;
  stopTyping();
  noteEls.forEach((el, i) => { el.textContent = lines[i]; el.classList.remove("caret"); });
});

/* ---------- buttons ---------- */
$("b-next").onclick = () => show("s-env");
$("b-flowers").onclick = () => { show("s-flowers"); burst(10); };
$("b-back").onclick = () => show("s-intro");
$("b-no").onclick = () => show("s-sad");
$("b-again").onclick = () => show("s-env");
$("b-open").onclick = () => {
  const env = $("env");
  env.classList.remove("wiggle");
  env.classList.add("open");
  burst();
  setTimeout(() => { show("s-msg"); burst(22); }, 1500);
};
$("b-restart").onclick = () => {
  $("env").classList.remove("open");
  $("env").classList.add("wiggle");
  show("s-intro");
};

function burst(n = 14) {
  if (reduce) return;
  const icons = ["🌹", "♥", "💗", "✨", "🌸", "💕"];
  for (let i = 0; i < n; i++) {
    const h = document.createElement("span");
    h.className = "pop-heart";
    h.textContent = icons[i % icons.length];
    h.style.left = 20 + Math.random() * 60 + "vw";
    h.style.top = 55 + Math.random() * 25 + "vh";
    h.style.setProperty("--dx", Math.random() * 100 - 50 + "px");
    h.style.animationDelay = Math.random() * 0.6 + "s";
    document.body.appendChild(h);
    setTimeout(() => h.remove(), 2900);
  }
}

/* ---------- golden trail that follows the cursor / finger ---------- */
(function () {
  if (reduce) return;
  const bits = ["♥", "✦", "♡", "✧"];
  const colors = ["#f2dca0", "#e8b4c0", "#ffd8a8", "#ff9db5"];
  let last = 0;
  addEventListener("pointermove", (e) => {
    const now = performance.now();
    if (now - last < 60) return;
    last = now;
    const s = document.createElement("span");
    s.className = "trail";
    s.textContent = bits[(Math.random() * bits.length) | 0];
    s.style.left = e.clientX + "px";
    s.style.top = e.clientY + "px";
    s.style.color = colors[(Math.random() * colors.length) | 0];
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1150);
  });
})();

/* ---------- bokeh lights in the background ---------- */
(function () {
  const box = $("bokeh");
  const n = Math.min(18, Math.round(innerWidth / 70) + 6);
  for (let i = 0; i < n; i++) {
    const el = document.createElement("i");
    const s = 30 + Math.random() * 90;
    el.style.width = el.style.height = s + "px";
    el.style.left = Math.random() * 100 + "%";
    el.style.top = Math.random() * 100 + "%";
    el.style.setProperty("--dx", Math.random() * 60 - 30 + "px");
    el.style.setProperty("--dy", Math.random() * 60 - 30 + "px");
    el.style.animationDuration = 6 + Math.random() * 8 + "s";
    el.style.animationDelay = -Math.random() * 10 + "s";
    box.appendChild(el);
  }
})();

/* ---------- string of fairy lights across the top ---------- */
function drawLights() {
  const svg = $("lights");
  const w = innerWidth;
  svg.setAttribute("viewBox", `0 0 ${w} 96`);
  const sag = 34;
  const spacing = 54;
  const n = Math.ceil(w / spacing);
  let out = `<defs><radialGradient id="g-bulb"><stop offset="0" stop-color="#fff3c8"/><stop offset=".35" stop-color="#ffd27a" stop-opacity=".9"/><stop offset="1" stop-color="#ffb35c" stop-opacity="0"/></radialGradient></defs>`;
  out += `<path d="M0 6 Q${w / 2} ${6 + sag * 2} ${w} 6" stroke="#2b0a16" stroke-width="2" fill="none"/>`;
  for (let i = 0; i <= n; i++) {
    const t = i / n;
    const x = t * w;
    const y = 6 + sag * 2 * t * (1 - t);
    out += `<g class="bulb" style="animation-delay:${(-Math.random() * 3).toFixed(2)}s">
      <circle cx="${x.toFixed(1)}" cy="${(y + 12).toFixed(1)}" r="17" fill="url(#g-bulb)"/>
      <rect x="${(x - 2.5).toFixed(1)}" y="${y.toFixed(1)}" width="5" height="6" rx="1.5" fill="#6b4a1c"/>
      <ellipse cx="${x.toFixed(1)}" cy="${(y + 12).toFixed(1)}" rx="4.2" ry="6.2" fill="#fff0c0"/>
    </g>`;
  }
  svg.innerHTML = out;
}
drawLights();
addEventListener("resize", drawLights);

/* ---------- falling rose petals + golden sparkles ---------- */
(function () {
  if (reduce) return;
  const cv = $("fx"), ctx = cv.getContext("2d");
  let W, H, dpr;
  const petalColors = ["#a4243f", "#c23556", "#dc5877", "#ee8099", "#ffb3c3"];
  const ps = [];

  function size() {
    dpr = Math.min(devicePixelRatio || 1, 2);
    W = cv.width = innerWidth * dpr;
    H = cv.height = innerHeight * dpr;
  }
  size();
  addEventListener("resize", size);

  function make(initial) {
    const r = Math.random();
    const kind = r < 0.62 ? "petal" : r < 0.92 ? "spark" : "heart";
    const falling = kind === "petal";
    return {
      kind,
      x: Math.random() * W,
      y: initial ? Math.random() * H : falling ? -30 * dpr : H + 30 * dpr,
      s: (kind === "petal" ? 8 + Math.random() * 9 : kind === "spark" ? 4 + Math.random() * 6 : 7 + Math.random() * 8) * dpr,
      vy: (falling ? 0.5 + Math.random() * 0.8 : -(0.2 + Math.random() * 0.4)) * dpr,
      amp: 14 + Math.random() * 30,
      ph: Math.random() * 6.28,
      rot: Math.random() * 6.28,
      vr: (Math.random() - 0.5) * 0.04,
      flip: Math.random() * 6.28,
      c: kind === "petal" ? petalColors[(Math.random() * petalColors.length) | 0] : kind === "spark" ? "#f6e2a8" : "#ff9db5",
      a: kind === "petal" ? 0.55 + Math.random() * 0.35 : 0.4 + Math.random() * 0.5
    };
  }
  const nPetals = Math.min(34, Math.round(innerWidth / 30));
  for (let i = 0; i < nPetals; i++) ps.push(make(true));

  function petalPath(s) {
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.bezierCurveTo(s * 0.95, -s * 0.55, s * 0.8, s * 0.7, 0, s);
    ctx.bezierCurveTo(-s * 0.8, s * 0.7, -s * 0.95, -s * 0.55, 0, -s);
    ctx.closePath();
  }
  function heartPath(s) {
    ctx.beginPath();
    ctx.moveTo(0, s * 0.35);
    ctx.bezierCurveTo(-s, -s * 0.3, -s * 0.5, -s * 0.9, 0, -s * 0.4);
    ctx.bezierCurveTo(s * 0.5, -s * 0.9, s, -s * 0.3, 0, s * 0.35);
    ctx.closePath();
  }
  function starPath(s) {
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.quadraticCurveTo(0, 0, s, 0);
    ctx.quadraticCurveTo(0, 0, 0, s);
    ctx.quadraticCurveTo(0, 0, -s, 0);
    ctx.quadraticCurveTo(0, 0, 0, -s);
    ctx.closePath();
  }

  let t = 0;
  (function frame() {
    t += 0.016;
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      p.y += p.vy;
      p.rot += p.vr;
      const x = p.x + Math.sin(t * 0.9 + p.ph) * p.amp * dpr;
      if (p.y < -50 * dpr || p.y > H + 50 * dpr) { ps[i] = make(false); continue; }
      ctx.save();
      ctx.translate(x, p.y);
      ctx.fillStyle = p.c;
      if (p.kind === "petal") {
        ctx.rotate(p.rot);
        ctx.scale(1, 0.35 + 0.65 * Math.abs(Math.cos(t * 1.4 + p.flip)));   // tumbling in 3D
        ctx.globalAlpha = p.a;
        petalPath(p.s);
        ctx.fill();
        ctx.globalAlpha = p.a * 0.35;
        ctx.strokeStyle = "#fff";
        ctx.lineWidth = dpr;
        ctx.beginPath(); ctx.moveTo(0, -p.s * 0.8); ctx.lineTo(0, p.s * 0.6); ctx.stroke();
      } else if (p.kind === "spark") {
        ctx.rotate(p.rot * 0.3);
        ctx.globalAlpha = p.a * (0.35 + 0.65 * Math.abs(Math.sin(t * 2 + p.ph)));
        ctx.shadowColor = "#ffd88a"; ctx.shadowBlur = 8 * dpr;
        starPath(p.s); ctx.fill();
      } else {
        ctx.rotate(Math.sin(t + p.ph) * 0.3);
        ctx.globalAlpha = p.a;
        heartPath(p.s); ctx.fill();
      }
      ctx.restore();
    }
    requestAnimationFrame(frame);
  })();
})();

/* =========================================================
   BOUQUET: a lush romantic bouquet
   red roses, white rose, blush peonies, tulips, cherry blossom,
   lavender, baby's breath and eucalyptus
   ========================================================= */
(function () {
  const svg = $("bouquet");
  if (!svg) return;

  // fixed "random" numbers so the bouquet looks the same every time
  let seed = 11;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

  const grad = (id, c1, c2) =>
    `<radialGradient id="${id}" cx="40%" cy="35%" r="80%"><stop offset="0" stop-color="${c1}"/><stop offset="1" stop-color="${c2}"/></radialGradient>`;

  const defs = `<defs>
    <radialGradient id="bq-glow" cx="50%" cy="45%" r="55%">
      <stop offset="0" stop-color="#ffe2a8" stop-opacity=".8"/><stop offset=".5" stop-color="#ff9db5" stop-opacity=".3"/><stop offset="1" stop-color="#ff9db5" stop-opacity="0"/>
    </radialGradient>
    ${grad("rr1", "#d2405f", "#7d1432")}${grad("rr2", "#e04a69", "#a02347")}${grad("rr3", "#f06f8a", "#c23556")}
    ${grad("rw1", "#f8e4ea", "#e9c3cd")}${grad("rw2", "#fff3f6", "#f6d9e0")}${grad("rw3", "#ffffff", "#fbe7ec")}
    ${grad("pn1", "#fbc0d0", "#ee8fa8")}${grad("pn2", "#fdd0dc", "#f4a0b6")}${grad("pn3", "#ffe6ec", "#fbc2d0")}
    ${grad("tp1", "#ff9bb7", "#e05a82")}${grad("tp2", "#ffc4d4", "#f58aa8")}
  </defs>`;

  // ring of identical petals around (0,0)
  const ring = (n, rx, ry, dist, fill, stroke, rot = 0, sw = 1.6) => {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = rot + (360 / n) * i;
      s += `<ellipse cx="0" cy="${-dist}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" transform="rotate(${a})"/>`;
    }
    return s;
  };

  // flower heads. roses and peonies are drawn at radius 1 and scaled when placed
  const rose = (kind) => {
    const red = kind === "red";
    const [a, b, c, line, hi] = red
      ? ["url(#rr1)", "url(#rr2)", "url(#rr3)", "#6e1230", "#ffc2d0"]
      : ["url(#rw1)", "url(#rw2)", "url(#rw3)", "#cf94a5", "#ffffff"];
    return (
      ring(5, 0.6, 0.62, 0.5, a, line, 0, 0.05) +
      ring(5, 0.45, 0.47, 0.34, b, line, 36, 0.05) +
      ring(4, 0.32, 0.34, 0.18, c, line, 10, 0.05) +
      `<circle r=".16" fill="${c}" stroke="${line}" stroke-width=".05"/>
       <path d="M-.1 .02 C-.1 -.14 .13 -.14 .13 0 C.13 .1 -.04 .13 -.04 .04" fill="none" stroke="${line}" stroke-width=".05" stroke-linecap="round"/>
       <path d="M-.55 -.45 C-.35 -.7 -.05 -.78 .2 -.72" stroke="${hi}" stroke-opacity=".6" stroke-width=".08" fill="none" stroke-linecap="round"/>`
    );
  };

  const peony = () =>
    ring(9, 0.42, 0.5, 0.62, "url(#pn1)", "#d9728f", 0, 0.04) +
    ring(8, 0.38, 0.44, 0.46, "url(#pn2)", "#d9728f", 20, 0.04) +
    ring(7, 0.32, 0.38, 0.3, "url(#pn3)", "#e08aa2", 10, 0.04) +
    ring(6, 0.22, 0.26, 0.16, "url(#pn3)", "#e08aa2", 30, 0.04) +
    `<circle r=".1" fill="#ffd36a" stroke="#e0a800" stroke-width=".03"/>
     <g fill="#e0a800"><circle cx="-.06" cy="-.04" r=".022"/><circle cx=".06" cy="-.05" r=".022"/><circle cx=".05" cy=".06" r=".022"/><circle cx="-.05" cy=".05" r=".022"/></g>
     <path d="M-.5 -.5 C-.3 -.72 -.05 -.78 .2 -.74" stroke="#fff" stroke-opacity=".55" stroke-width=".07" fill="none" stroke-linecap="round"/>`;

  const tulip = () =>
    `<path d="M-19 8 C-24 -22 -10 -36 -4 -44 C0 -34 -2 -20 0 8Z" fill="url(#tp1)" stroke="#b83e66" stroke-width="1.6" stroke-linejoin="round"/>
     <path d="M19 8 C24 -22 10 -36 4 -44 C0 -34 2 -20 0 8Z" fill="url(#tp1)" stroke="#b83e66" stroke-width="1.6" stroke-linejoin="round"/>
     <path d="M-12 8 C-14 -18 -4 -34 0 -48 C4 -34 14 -18 12 8 C6 13 -6 13 -12 8Z" fill="url(#tp2)" stroke="#b83e66" stroke-width="1.6" stroke-linejoin="round"/>
     <path d="M0 -40 C-3 -25 -2 -10 0 4" stroke="#fff" stroke-opacity=".6" stroke-width="2.4" fill="none" stroke-linecap="round"/>`;

  const sakura = () => {
    let s = "";
    for (let i = 0; i < 5; i++) {
      s += `<path d="M0 0 C-14 -8 -15 -26 -5 -32 L0 -26 L5 -32 C15 -26 14 -8 0 0Z" fill="#ffd3e2" stroke="#f08bad" stroke-width="1.5" stroke-linejoin="round" transform="rotate(${i * 72})"/>`;
    }
    s += `<circle r="5" fill="#ff8fb1"/>`;
    for (let i = 0; i < 6; i++) {
      const a = (i * 60 * Math.PI) / 180;
      const x = (Math.sin(a) * 12).toFixed(1), y = (-Math.cos(a) * 12).toFixed(1);
      s += `<path d="M0 0 L${x} ${y}" stroke="#e0457b" stroke-width="1.3"/><circle cx="${x}" cy="${y}" r="1.7" fill="#ffd23f"/>`;
    }
    return s;
  };

  const lavender = (x, y, tilt, sc = 1) => {
    let s = `<g transform="translate(${x} ${y}) rotate(${tilt}) scale(${sc})"><path d="M0 0 V-92" stroke="#6aa376" stroke-width="2.4" stroke-linecap="round"/>`;
    for (let i = 0; i < 9; i++) {
      const yy = -i * 9 - 8;
      s += `<ellipse cx="-4.5" cy="${yy}" rx="3.6" ry="6" fill="${i % 2 ? "#b28cf0" : "#c8aef8"}" stroke="#8a62d6" stroke-width="1.1" transform="rotate(-25 -4.5 ${yy})"/>`;
      s += `<ellipse cx="4.5" cy="${yy - 4}" rx="3.6" ry="6" fill="${i % 2 ? "#c8aef8" : "#b28cf0"}" stroke="#8a62d6" stroke-width="1.1" transform="rotate(25 4.5 ${yy - 4})"/>`;
    }
    return s + `<ellipse cx="0" cy="-92" rx="3.2" ry="6" fill="#b28cf0" stroke="#8a62d6" stroke-width="1.1"/></g>`;
  };

  // baby's breath: thin branching stems with tiny white blossoms
  const gyp = (cx, cy, n, spread) => {
    let s = "";
    for (let i = 0; i < n; i++) {
      const a = (-Math.PI / 2) + (rnd() - 0.5) * 2.4;
      const len = spread * (0.55 + rnd() * 0.5);
      const ex = cx + Math.cos(a) * len, ey = cy + Math.sin(a) * len;
      const mx = cx + Math.cos(a) * len * 0.5 + (rnd() - 0.5) * 6, my = cy + Math.sin(a) * len * 0.5;
      s += `<path d="M${cx} ${cy + spread * 0.5} Q${mx.toFixed(1)} ${my.toFixed(1)} ${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="#86b28f" stroke-width="1" fill="none"/>`;
      [[ex, ey, 3.2], [mx, my, 2.5], [(ex + mx) / 2 + 3, (ey + my) / 2, 2.2]].forEach(([x, y, r]) => {
        s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r}" fill="#fff" stroke="#e8cdd5" stroke-width=".8"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(r * 0.35).toFixed(1)}" fill="#ffe08a"/>`;
      });
    }
    return s;
  };

  // eucalyptus sprig with round silvery leaves
  const euc = (x, y, ang, len) => {
    let s = `<g transform="translate(${x} ${y}) rotate(${ang})"><path d="M0 0 Q7 ${-len / 2} 0 ${-len}" stroke="#6f9a7d" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    const n = Math.round(len / 22);
    for (let i = 1; i <= n; i++) {
      const yy = (-i * len) / (n + 1);
      s += `<ellipse cx="-8" cy="${yy.toFixed(1)}" rx="7" ry="9" fill="#a9cdb3" stroke="#6f9a7d" stroke-width="1" transform="rotate(-28 -8 ${yy.toFixed(1)})"/>`;
      s += `<ellipse cx="8" cy="${(yy - 7).toFixed(1)}" rx="7" ry="9" fill="#bcd9c4" stroke="#6f9a7d" stroke-width="1" transform="rotate(28 8 ${(yy - 7).toFixed(1)})"/>`;
    }
    return s + `<ellipse cx="1" cy="${-len - 6}" rx="6" ry="8" fill="#a9cdb3" stroke="#6f9a7d" stroke-width="1"/></g>`;
  };

  const base = [180, 300];
  // [drawer, x, y, scale, stem colour, stem width]
  const heads = {
    sakura:  [[sakura, 46, 128, 0.95], [sakura, 70, 168, 0.75], [sakura, 314, 130, 0.95], [sakura, 292, 170, 0.75]],
    peonies: [[peony, 108, 150, 38], [peony, 254, 152, 36]],
    tulips:  [[tulip, 142, 92, 1.0], [tulip, 222, 88, 1.0]],
    roses:   [[() => rose("red"), 180, 132, 36], [() => rose("red"), 86, 214, 27], [() => rose("red"), 276, 212, 27]],
    white:   [[() => rose("white"), 180, 208, 30]]
  };

  const stem = (x, y, color, w) => {
    const cx = (x + base[0]) / 2 + (x < 180 ? -10 : 10);
    return `<path d="M${base[0]} ${base[1]} Q${cx} ${(y + base[1]) / 2} ${x} ${y}" stroke="${color}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
  };
  const place = (fn, x, y, sc, d) =>
    `<g class="bloom" style="animation-delay:${d.toFixed(2)}s"><g transform="translate(${x} ${y}) scale(${sc})"><g class="fl" style="animation-delay:${(-d * 3).toFixed(2)}s">${fn()}</g></g></g>`;

  let out = defs;

  // warm glow behind the bouquet
  out += `<circle class="bq-glow" cx="180" cy="160" r="165" fill="url(#bq-glow)"/>`;

  // greenery and filler at the back
  out += `<g class="bloom" style="animation-delay:.02s"><g class="fl">${euc(166, 300, -10, 255)}${euc(196, 300, 10, 245)}${euc(74, 254, -30, 120)}${euc(292, 254, 30, 120)}</g></g>`;
  out += `<g class="bloom" style="animation-delay:.1s"><g class="fl">${lavender(70, 240, -22, 0.95)}${lavender(300, 238, 22, 0.95)}</g></g>`;
  out += `<g class="bloom" style="animation-delay:.2s"><g class="fl">${gyp(120, 78, 9, 30)}${gyp(236, 76, 9, 30)}${gyp(180, 56, 8, 26)}${gyp(54, 204, 7, 26)}${gyp(312, 202, 7, 26)}${gyp(150, 196, 6, 22)}${gyp(214, 184, 6, 22)}</g></g>`;

  // stems
  heads.sakura.forEach(([, x, y]) => (out += stem(x, y, "#9a6a56", 2.4)));
  [...heads.peonies, ...heads.tulips, ...heads.roses, ...heads.white].forEach(([, x, y]) => (out += stem(x, y, "#5a9a68", 4.2)));

  // a few leaves on the stems
  const leaf = (x, y, r, sc = 1) =>
    `<path d="M0 0 C10 -10 28 -8 34 0 C26 10 10 10 0 0Z" fill="#79c97f" stroke="#4a9a56" stroke-width="1.5" transform="translate(${x} ${y}) rotate(${r}) scale(${sc})"/>`;
  out += leaf(138, 236, -150) + leaf(222, 236, -30) + leaf(118, 190, -130, 0.9) + leaf(244, 192, -50, 0.9);

  // flower heads, back to front
  let d = 0.25;
  const next = () => (d += 0.12);
  heads.sakura.forEach(([fn, x, y, sc]) => (out += place(fn, x, y, sc, next())));
  heads.peonies.forEach(([fn, x, y, sc]) => (out += place(fn, x, y, sc, next())));
  heads.tulips.forEach(([fn, x, y, sc]) => (out += place(fn, x, y, sc, next())));
  heads.roses.forEach(([fn, x, y, sc]) => (out += place(fn, x, y, sc, next())));
  heads.white.forEach(([fn, x, y, sc]) => (out += place(fn, x, y, sc, next())));

  // wrapping paper, satin ribbon and a gold tag
  out += `
    <path d="M58 248 L302 248 L228 374 L132 374Z" fill="#f5c9d4" stroke="#c9a24b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M58 248 L180 284 L132 374Z" fill="#fde7ec" stroke="#c9a24b" stroke-width="3" stroke-linejoin="round"/>
    <path d="M302 248 L180 284 L228 374Z" fill="#fff6f0" stroke="#c9a24b" stroke-width="3" stroke-linejoin="round"/>
    <g fill="#c9a24b" opacity=".8"><circle cx="118" cy="272" r="2.6"/><circle cx="96" cy="258" r="2.6"/><circle cx="150" cy="320" r="2.6"/><circle cx="242" cy="272" r="2.6"/><circle cx="264" cy="258" r="2.6"/><circle cx="210" cy="320" r="2.6"/></g>
    <g transform="translate(131 258) scale(.96)"><use href="#ribbon"/></g>
    <path d="M214 286 C226 292 232 300 236 306" stroke="#c9a24b" stroke-width="2" fill="none"/>
    <g transform="translate(232 302) rotate(-12)">
      <path d="M2 0 H64 A4 4 0 0 1 68 4 V34 A4 4 0 0 1 64 38 H2 A4 4 0 0 1 -2 34 V4 A4 4 0 0 1 2 0Z" fill="#fff8f0" stroke="#c9a24b" stroke-width="2"/>
      <circle cx="4" cy="4" r="2.2" fill="#f5c9d4" stroke="#c9a24b" stroke-width="1"/>
      <text x="34" y="27" text-anchor="middle" font-family="'Great Vibes', cursive" font-size="18" fill="#7a1a3a">For you</text>
    </g>`;

  // petals drifting down around the bouquet, and twinkling sparkles
  [[40, 0.0], [92, 1.6], [150, 3.1], [214, 0.9], [270, 2.4], [326, 3.8], [120, 4.6], [244, 5.2]].forEach(([x, dl], i) => {
    out += `<g transform="translate(${x} 0)"><path class="fp" style="--dx:${i % 2 ? 26 : -26}px;animation-delay:${dl}s" d="M0 -8 C8 -4 7 6 0 8 C-7 6 -8 -4 0 -8Z" fill="${["#c23556", "#ee8099", "#ffb3c3", "#a4243f"][i % 4]}"/></g>`;
  });
  [[26, 60], [334, 80], [52, 30], [312, 40], [24, 240], [338, 250], [180, 14]].forEach(([x, y], i) => {
    out += `<path class="tw" style="animation-delay:${(i * 0.45).toFixed(2)}s" d="M${x} ${y - 7} Q${x} ${y} ${x + 7} ${y} Q${x} ${y} ${x} ${y + 7} Q${x} ${y} ${x - 7} ${y} Q${x} ${y} ${x} ${y - 7}Z" fill="#f6e2a8" stroke="#c9a24b" stroke-width=".8"/>`;
  });

  svg.innerHTML = out;

  const names = ["🌹 Red rose", "🌸 Peony", "🤍 White rose", "🌷 Tulip", "🌸 Cherry blossom", "💜 Lavender", "🤍 Baby's breath", "🌿 Eucalyptus"];
  $("legend").innerHTML = names.map((n, i) => `<li style="animation-delay:${(0.2 + i * 0.08).toFixed(2)}s">${n}</li>`).join("");
})();