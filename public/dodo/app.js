/* ==================================================================
   Anniversary card: interactions & animation.
   You shouldn't need to touch this file; all content is in content.js.
   ================================================================== */
(() => {
  'use strict';

  const C = window.CARD || {};
  const UI = Object.assign({
    tapSeal: 'tap the seal to open',
    openCover: 'open me',
    turnHint: 'tap or swipe to turn the page',
    tapHeart: 'tap a heart',
    oneMore: 'one more thing ♥',
    madeWithLove: 'made with love',
    counterLabel: 'together for',
    kiss: 'send a kiss',
    replay: 'read it again',
    days: 'days', hours: 'hours', minutes: 'minutes', seconds: 'seconds'
  }, C.ui || {});

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const FLIP_MS = reduce ? 450 : 1100;
  const DPR = Math.min(window.devicePixelRatio || 1, 2);

  const $ = (s, r = document) => r.querySelector(s);
  const rand = (a, b) => a + Math.random() * (b - a);
  const pick = a => a[(Math.random() * a.length) | 0];
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInOut = t => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
  const easeOut = t => 1 - Math.pow(1 - t, 3);
  const sleep = ms => new Promise(r => setTimeout(r, reduce ? Math.min(ms, 150) : ms));
  const restart = (el, cls) => { el.classList.remove(cls); void el.offsetWidth; el.classList.add(cls); };

  /* ── content helpers ───────────────────────────────────────────── */

  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const has = v => (typeof v === 'string' ? v.trim() !== '' : v != null && v !== false);
  const ph = label => `<span class="ph">✎ ${esc(label)}</span>`;
  // empty fields render nothing (and their element collapses via CSS :empty),
  // unless CARD.showPlaceholders is on to reveal the open slots while editing
  const SHOW_PH = C.showPlaceholders === true;
  const txt = (v, label) => (has(v) ? esc(v).replace(/\n/g, '<br>') : SHOW_PH ? ph(label) : '');
  const paras = (v, label, lines = [100, 94, 98, 90, 96, 62]) => {
    const list = (Array.isArray(v) ? v : [v]).filter(has);
    if (list.length) return list.map(p => `<p>${txt(p)}</p>`).join('');
    if (!SHOW_PH) return '';
    return `<div class="ph-lines">${ph(label)}${lines.map(w => `<i style="width:${w}%"></i>`).join('')}</div>`;
  };

  const HEART = 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z';
  const HEART_PATH = new Path2D(HEART);
  const svgHeart = (cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true"><path d="${HEART}"/></svg>`;
  // `focus` is an optional CSS object-position (e.g. "50% 20%") to keep faces in frame when cropped
  const pic = (src, label, focus) => (has(src)
    ? `<img src="${esc(src)}" alt="" loading="lazy" draggable="false"${has(focus) ? ` style="object-position:${esc(focus)}"` : ''}>`
    : `<div class="ph-img">${svgHeart()}<span>${esc(label)}</span></div>`);
  const zoomable = (src, cap) => `data-img="${esc(src || '')}" data-cap="${esc(cap || '')}"`;

  const FLOURISH = `<svg class="flourish" viewBox="0 0 240 24" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" aria-hidden="true">
    <path d="M6 12h74c10 0 14-8 22-8 6 0 8 5 4 8-3 2-7 0-6-3"/>
    <path d="M234 12h-74c-10 0-14-8-22-8-6 0-8 5-4 8 3 2 7 0 6-3"/>
    <path d="M120 19s-7-4.3-9-8.6c-1.4-3.2.6-6.4 3.8-6.4 2 0 3.4 1.1 4.2 2.4.8-1.3 2.2-2.4 4.2-2.4 3.2 0 5.2 3.2 3.8 6.4-2 4.3-9 8.6-9 8.6z" fill="currentColor" stroke="none"/>
  </svg>`;
  const DOODLE = `<svg class="doodle" viewBox="0 0 120 60" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M18 40c-8-6-13-14-8-19 4-4 9-1 10 3 2-4 7-7 11-3 5 5-1 13-9 19l-2 2z"/>
    <path d="M62 26c-5-4-8-9-5-12 3-2 6 0 7 2 1-2 4-4 7-2 3 3-1 8-6 12z"/>
    <path d="M84 44c8-1 13 3 22-4"/>
  </svg>`;

  // ALL-CAPS words (initials) are set in spaced roman capitals and "&" in italic serif,
  // since script capitals and ampersands tangle together
  const fancyTitle = t => esc(t).split(/(\s+)/).map(w =>
    w === '&amp;' ? '<span class="amp">&amp;</span>'
      : /^[A-Z]{2,}$/.test(w) ? `<span class="tcaps">${w}</span>`
        : w).join('');

  // little doodles, washi tape and tappable emoji stickers for the letter margins
  const doodleHeart = (cls, style) => `<svg class="doodle-mini ${cls}" style="${style}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-8.6-8.6C2.2 8 4.2 5 7.3 5c2 0 3.6 1.2 4.7 2.8C13.1 6.2 14.7 5 16.7 5c3.1 0 5.1 3 3.9 6.4C19 15.6 12 20 12 20z"/></svg>`;
  const doodleSpark = (cls, style) => `<svg class="doodle-mini ${cls}" style="${style}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c.6 4.8 2.4 7.4 8 10-5.6 2.6-7.4 5.2-8 10-.6-4.8-2.4-7.4-8-10 5.6-2.6 7.4-5.2 8-10z"/></svg>`;
  const sticker = (ch, style) => `<button class="sticker" style="${style}" aria-label="sticker">${ch}</button>`;
  const LETTER_DECO_TOP = `<div class="deco" aria-hidden="true">
      <span class="washi" style="top:4cqw;left:-5cqw;--r:-38deg"></span>
      ${sticker('🦤', 'top:5cqw;right:6cqw;--r:12deg;font-size:11.5cqw')}
      ${doodleSpark('twinkle', 'top:5cqw;right:22cqw;width:4cqw')}
      ${doodleSpark('twinkle d2', 'top:17cqw;right:5cqw;width:2.6cqw')}
      ${doodleHeart('bob', 'bottom:12cqw;left:9cqw;width:6cqw')}
      ${doodleHeart('bob d2', 'bottom:18cqw;left:17cqw;width:4cqw')}
      ${doodleHeart('bob d3', 'bottom:11cqw;left:23cqw;width:3cqw')}
      ${sticker('💌', 'bottom:19cqw;right:16cqw;--r:-9deg;font-size:11cqw')}
      ${sticker('🧸', 'bottom:26cqw;right:7cqw;--r:10deg;font-size:7.5cqw')}
      ${doodleSpark('twinkle d3', 'bottom:33cqw;right:27cqw;width:3cqw')}
    </div>`;
  const LETTER_DECO_END = `<div class="deco" aria-hidden="true">
      <span class="washi" style="top:4cqw;right:-5cqw;--r:38deg"></span>
      ${doodleSpark('twinkle', 'top:6cqw;left:9cqw;width:3.4cqw')}
      ${doodleSpark('twinkle d2', 'top:9cqw;left:15cqw;width:2.4cqw')}
      ${sticker('🌷', 'bottom:12cqw;left:8cqw;--r:-12deg')}
      ${sticker('🍓', 'bottom:21cqw;left:20cqw;--r:10deg;font-size:7cqw')}
      ${sticker('💕', 'bottom:10cqw;left:27cqw;--r:-6deg;font-size:6.5cqw')}
    </div>`;

  /* ── page renderers ────────────────────────────────────────────── */

  const Pages = {
    cover() {
      const c = C.cover || {};
      const art = has(c.image)
        ? `<div class="cover-photo"><img src="${esc(c.image)}" alt="" draggable="false"></div>`
        : `<div class="cover-emblem">${svgHeart()}</div>`;
      return `<div class="glint"></div>
        <div class="cover-frame"><i></i><i></i><i></i><i></i></div>
        <div class="cover-body">
          ${art}
          <p class="cover-eyebrow">${txt(c.eyebrow, 'eyebrow')}</p>
          <h2 class="cover-title big">${has(c.title) ? fancyTitle(c.title) : txt(c.title, 'cover title')}</h2>
          ${FLOURISH}
          <p class="cover-sub">${txt(c.subtitle, 'subtitle')}</p>
        </div>
        <span class="open-hint">${esc(UI.openCover)}</span>`;
    },

    backcover() {
      return `<div class="glint"></div>
        <div class="cover-frame"><i></i><i></i><i></i><i></i></div>
        <div class="cover-body">
          <div class="cover-emblem small">${svgHeart()}</div>
          <p class="cover-sub">${esc(UI.madeWithLove)}</p>
          <button class="btn-love on-dark" data-finale>${esc(UI.oneMore)}</button>
        </div>`;
    },

    letter(p) {
      // `continues` / `continued` let one letter span two pages
      return `<div class="pg pg-letter${p.continued ? ' is-continued' : ''}">
        ${p.continued ? '' : LETTER_DECO_TOP}${p.continues ? '' : LETTER_DECO_END}
        ${p.continued ? '' : `<h3 class="greet big">${txt(p.greeting, 'greeting')}</h3>`}
        <div class="letter-body scroll">${paras(p.body, 'your letter')}</div>
        ${p.continues ? '<p class="letter-more">…</p>' : `
          <p class="signoff">${txt(p.signoff, 'sign-off')}</p>
          <p class="sig big">${txt(p.signature, 'your name')}</p>`}
      </div>`;
    },

    photo(p) {
      return `<div class="pg pg-photo">
        <figure class="polaroid lone" style="--r:-3deg" ${zoomable(p.image, p.caption)}>
          <span class="tape"></span>
          <div class="shot">${pic(p.image, 'photo', p.focus)}</div>
          <figcaption>${txt(p.caption, 'caption')}</figcaption>
        </figure>
        ${DOODLE}
      </div>`;
    },

    memory(p) {
      const shot = 'image' in p
        ? `<figure class="memory-shot" ${zoomable(p.image, p.title)}>${pic(p.image, 'photo', p.focus)}</figure>`
        : '';
      return `<div class="pg pg-memory">
        <span class="chip">${txt(p.date, 'date')}</span>
        <h3 class="pg-heading scrap">${has(p.title) ? `<span class="hl">${txt(p.title)}</span>` : txt(p.title, 'title')}</h3>
        ${shot}
        <div class="memory-text scroll">${paras(p.text, 'the story', [100, 92, 97, 58])}</div>
      </div>`;
    },

    polaroids(p) {
      const photos = (Array.isArray(p.photos) && p.photos.length ? p.photos : [{}, {}, {}]).slice(0, 3);
      return `<div class="pg pg-polaroids">
        <h3 class="pg-heading scrap">${has(p.heading) ? `<span class="hl">${txt(p.heading)}</span>` : txt(p.heading, 'heading')}</h3>
        <div class="pile n${photos.length}">
          ${photos.map((f, i) => `
            <figure class="polaroid p${i + 1}" ${zoomable(f.image, f.caption)}>
              <span class="tape"></span>
              <div class="shot">${pic(f.image, 'photo', f.focus)}</div>
              <figcaption>${txt(f.caption, 'caption')}</figcaption>
            </figure>`).join('')}
        </div>
      </div>`;
    },

    reasons(p) {
      const list = (Array.isArray(p.reasons) && p.reasons.length ? p.reasons : Array(6).fill('')).slice(0, 6);
      return `<div class="pg pg-reasons">
        <h3 class="pg-heading big">${txt(p.heading, 'heading')}</h3>
        <p class="pg-hint">${esc(UI.tapHeart)}</p>
        <div class="reasons">
          ${list.map((r, i) => `
            <button class="reason" aria-label="Reveal reason ${i + 1}">
              <span class="reason-in">
                <span class="reason-f">${svgHeart()}<em>${String(i + 1).padStart(2, '0')}</em></span>
                <span class="reason-b">${txt(r, 'reason')}</span>
              </span>
            </button>`).join('')}
        </div>
      </div>`;
    },

    note(p) {
      const lines = (Array.isArray(p.lines) ? p.lines : [p.lines]).filter(has);
      return `<div class="pg pg-note" lang="zh">
        <div class="deco" aria-hidden="true">
          <span class="washi" style="top:4cqw;right:-5cqw;--r:38deg"></span>
          ${doodleHeart('bob', 'top:11cqw;right:24cqw;width:5cqw')}
          ${doodleSpark('twinkle', 'top:7cqw;right:33cqw;width:3cqw')}
          ${sticker('🦤', 'bottom:12cqw;left:8cqw;--r:-10deg;font-size:10cqw')}
          ${sticker('💗', 'bottom:21cqw;left:20cqw;--r:12deg;font-size:6.5cqw')}
        </div>
        <h3 class="note-greet">${txt(p.greeting, 'greeting')}</h3>
        <div class="note-body scroll">${lines.length ? lines.map(l => `<p>${txt(l)}</p>`).join('') : paras('', 'your note')}</div>
        <p class="note-closing">${has(p.closing) ? `— ${txt(p.closing)}` : txt(p.closing, 'closing')}</p>
      </div>`;
    },

    quote(p) {
      return `<div class="pg pg-quote">
        <span class="qmark" aria-hidden="true">“</span>
        <blockquote>${txt(p.text, 'a line you love')}</blockquote>
        ${FLOURISH}
        <cite>${txt(p.by, 'who said it')}</cite>
      </div>`;
    },

    end(p) {
      return `<div class="pg pg-end">
        <div class="end-heart">${svgHeart()}</div>
        <p class="end-text">${txt(p.text, 'a last little note')}</p>
        <button class="btn-love" data-finale>${esc(has(p.button) ? p.button : UI.oneMore)}</button>
      </div>`;
    },

    filler() {
      return `<div class="pg pg-filler">${FLOURISH}</div>`;
    }
  };

  /* ── book ──────────────────────────────────────────────────────── */

  const root = document.documentElement;
  const book = $('#book');
  const stage = $('#book-stage');
  const prevBtn = $('#prev');
  const nextBtn = $('#next');
  const fill = $('#progress-fill');
  const progHeart = $('#progress-heart');
  const bookHint = $('#book-hint');

  let leaves = [];
  let L = 0;            // number of leaves
  let flipped = 0;      // leaves turned to the left
  let side = 'R';       // single-page mode: which half is centred
  let single = false;   // phone layout: show one page at a time
  let pw = 360;
  let lockUntil = 0;
  let turnSeq = 0;
  let turns = 0;
  const turning = new Set();

  root.style.setProperty('--flip', FLIP_MS + 'ms');

  function buildBook() {
    const pages = (C.pages || []).filter(p => p && Pages[p.type]);
    const faces = [{ type: 'cover' }, ...pages];
    if (faces.length % 2 === 0) faces.push({ type: 'filler' });
    faces.push({ type: 'backcover' });

    let n = 0;
    const face = (f, which) => {
      const isCover = f.type === 'cover' || f.type === 'backcover';
      const folio = !isCover && f.type !== 'filler' ? `<div class="folio">${++n}</div>` : '';
      return `<div class="face ${which} ${isCover ? 'is-cover' : 'is-paper'}">${Pages[f.type](f)}${folio}</div>`;
    };

    book.innerHTML = '';
    leaves = [];
    for (let i = 0; i < faces.length; i += 2) {
      const lf = document.createElement('div');
      lf.className = 'leaf';
      lf.innerHTML = face(faces[i], 'front') + face(faces[i + 1], 'back');
      book.appendChild(lf);
      leaves.push(lf);
    }
    L = leaves.length;
    flipped = 0;
    side = 'R';
    turns = 0;
    turning.clear();
    bookHint.classList.remove('gone');
    setZ();
    update();
  }

  function setZ() {
    leaves.forEach((lf, i) => {
      if (!turning.has(lf)) lf.style.zIndex = lf.classList.contains('flipped') ? i + 1 : 2 * L - i;
      lf.classList.toggle('live', i === flipped || i === flipped - 1);
    });
  }

  function flip(i, forward) {
    const lf = leaves[i];
    lf.classList.remove('peek');
    turning.add(lf);
    lf.style.zIndex = 100 + (++turnSeq);
    lf.classList.toggle('flipped', forward);
    lf.classList.remove('turn-fwd', 'turn-back');
    void lf.offsetWidth;
    lf.classList.add(forward ? 'turn-fwd' : 'turn-back');
    clearTimeout(lf._t);
    lf._t = setTimeout(() => {
      turning.delete(lf);
      lf.classList.remove('turn-fwd', 'turn-back');
      setZ();
    }, FLIP_MS);
    setZ();
    if (++turns >= 2) bookHint.classList.add('gone');
  }

  function layout() {
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const availH = vh - 170;
    const spread = Math.min((vw * 0.92) / 2, availH / 1.42, 420);
    single = spread < 270;
    pw = Math.floor(single ? Math.min(vw * 0.84, availH / 1.42, 440) : spread);
    pw = Math.max(pw, 160);
    root.style.setProperty('--pw', pw + 'px');
    root.style.setProperty('--ph', Math.round(pw * 1.42) + 'px');
    update();
  }

  // shrink long letters/stories a little so they fit the page instead of scrolling
  function fitText() {
    document.querySelectorAll('.letter-body, .memory-text, .note-body').forEach(el => {
      el.style.fontSize = '';
      let fs = parseFloat(getComputedStyle(el).fontSize);
      const min = fs * .72;
      while (el.scrollHeight > el.clientHeight + 1 && fs > min) {
        fs -= .25;
        el.style.fontSize = fs + 'px';
      }
    });
  }

  function update() {
    let shift = 0;
    if (single) shift = side === 'R' ? -pw / 2 : pw / 2;
    else if (flipped === 0) shift = -pw / 2;
    else if (flipped === L) shift = pw / 2;
    book.style.setProperty('--shift', shift + 'px');

    const max = single ? 2 * L - 1 : L;
    const pos = single ? (side === 'R' ? 2 * flipped : 2 * flipped - 1) : flipped;
    const pct = (pos / max) * 100;
    fill.style.width = pct + '%';
    progHeart.style.left = pct + '%';
    prevBtn.disabled = pos === 0;
  }

  function lock(ms = 380) { lockUntil = performance.now() + ms; }
  const locked = () => performance.now() < lockUntil;

  function next() {
    if (locked()) return;
    if (single) {
      if (side === 'R' && flipped < L) { flip(flipped, true); flipped++; side = 'L'; }
      else if (side === 'L' && flipped < L) side = 'R';
      else return goFinale();
    } else {
      if (flipped < L) { flip(flipped, true); flipped++; }
      else return goFinale();
    }
    lock();
    update();
  }

  function prev() {
    if (locked()) return;
    if (single) {
      if (side === 'L') { flip(flipped - 1, false); flipped--; side = 'R'; }
      else if (flipped > 0) side = 'L';
      else return;
    } else {
      if (flipped === 0) return;
      flip(flipped - 1, false);
      flipped--;
    }
    lock();
    update();
  }

  let swiped = false;
  let sx = 0, sy = 0;
  stage.addEventListener('pointerdown', e => { sx = e.clientX; sy = e.clientY; swiped = false; });
  stage.addEventListener('pointerup', e => {
    const dx = e.clientX - sx, dy = e.clientY - sy;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
      swiped = true;
      dx < 0 ? next() : prev();
    }
  });

  book.addEventListener('click', e => {
    if (swiped) { swiped = false; return; }

    if (e.target.closest('[data-finale]')) return goFinale();

    const reason = e.target.closest('.reason');
    if (reason) {
      reason.classList.toggle('open');
      if (reason.classList.contains('open')) {
        const r = reason.getBoundingClientRect();
        FX.burst(r.left + r.width / 2, r.top + r.height / 2, 14, .65);
      }
      return;
    }

    const stick = e.target.closest('.sticker');
    if (stick) {
      restart(stick, 'boing');
      const r = stick.getBoundingClientRect();
      FX.burst(r.left + r.width / 2, r.top + r.height / 2, 10, .55);
      return;
    }

    const zoom = e.target.closest('[data-img]');
    if (zoom) {
      if (zoom.dataset.img) openLightbox(zoom.dataset.img, zoom.dataset.cap);
      else restart(zoom, 'wiggle');
      return;
    }

    if (single) (e.clientX < window.innerWidth * 0.3 ? prev : next)();
    else {
      const r = book.getBoundingClientRect();
      (e.clientX > r.left + r.width / 2 ? next : prev)();
    }
  });

  prevBtn.addEventListener('click', prev);
  nextBtn.addEventListener('click', next);

  // gently peek the cover open until she opens it
  setInterval(() => {
    if (scene !== 'book' || flipped > 0 || reduce || !leaves[0] || turning.size) return;
    restart(leaves[0], 'peek');
  }, 4500);

  /* ── lightbox ──────────────────────────────────────────────────── */

  const lightbox = $('#lightbox');
  function openLightbox(src, cap) {
    $('#lb-img').src = src;
    $('#lb-cap').textContent = cap || '';
    lightbox.classList.add('open');
  }
  lightbox.addEventListener('click', () => lightbox.classList.remove('open'));

  /* ── music ─────────────────────────────────────────────────────── */

  const audio = $('#audio');
  const musicBtn = $('#music');
  const hasMusic = has(C.music);
  if (hasMusic) { audio.src = C.music; musicBtn.hidden = false; }

  function fadeAudio(to, ms) {
    const from = audio.volume, t0 = performance.now();
    const step = now => {
      const k = clamp((now - t0) / ms, 0, 1);
      audio.volume = from + (to - from) * k;
      if (k < 1) requestAnimationFrame(step);
      else if (to === 0) audio.pause();
    };
    requestAnimationFrame(step);
  }
  function playMusic() {
    if (!hasMusic) return;
    audio.volume = 0;
    audio.play().then(() => { musicBtn.classList.add('playing'); fadeAudio(.6, 1800); }).catch(() => {});
  }
  musicBtn.addEventListener('click', () => {
    if (audio.paused) playMusic();
    else { musicBtn.classList.remove('playing'); fadeAudio(0, 500); }
  });

  /* ── scenes ────────────────────────────────────────────────────── */

  let scene = 'envelope';
  function show(name) {
    scene = name;
    document.querySelectorAll('.scene').forEach(s => s.classList.toggle('is-active', s.id === 'scene-' + name));
  }

  const envScene = $('#scene-envelope');
  const envelope = $('#envelope');
  const seal = $('#seal');
  let opened = false;

  async function openEnvelope() {
    if (opened) return;
    opened = true;
    playMusic();

    const r = seal.getBoundingClientRect();
    FX.burst(r.left + r.width / 2, r.top + r.height / 2, 30, 1);
    seal.classList.add('pop');
    envScene.classList.add('opening');

    await sleep(380);
    envelope.classList.add('flap-open');
    await sleep(480);
    envelope.classList.add('flap-behind');
    await sleep(200);
    envelope.classList.add('letter-out');
    await sleep(1150);
    envScene.classList.add('leaving');
    FX.floatUp(reduce ? 6 : 18);
    await sleep(750);
    show('book');
  }

  envelope.addEventListener('click', openEnvelope);

  const finScene = $('#scene-finale');
  let finaleBusy = false;

  async function goFinale() {
    if (scene === 'finale' || finaleBusy) return;
    finaleBusy = true;
    const bookScene = $('#scene-book');
    bookScene.classList.add('leaving');
    document.body.classList.add('is-night');
    await sleep(1000);
    show('finale');
    Stars.start();
    startCounter();
    finScene.classList.add('reveal');
    await sleep(900);
    bookScene.classList.remove('leaving');
    finaleBusy = false;
    setTimeout(() => { if (scene === 'finale') FX.confetti(reduce ? 30 : 150); }, reduce ? 0 : 3400);
  }

  async function replay() {
    finScene.classList.remove('reveal');
    document.body.classList.remove('is-night');
    clearInterval(counterTimer);

    opened = false;
    envelope.className = 'envelope';
    seal.classList.remove('pop');
    envScene.classList.remove('opening', 'leaving');
    restart(envScene, 'intro');
    buildBook();
    fitText();

    show('envelope');
    await sleep(1000);
    Stars.stop();
  }

  $('#kiss').addEventListener('click', e => {
    const h = Stars.kiss();
    FX.burst(h.x, h.y, reduce ? 12 : 46, 1.3);
    const r = e.currentTarget.getBoundingClientRect();
    FX.burst(r.left + r.width / 2, r.top + r.height / 2, 16, .7);
    FX.floatUp(reduce ? 8 : 26);
    const KISSES = ['😘', '😘', '😘', '😚', '😙', '😗'];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      FX.emoji(h.x, h.y, Math.cos(a) * 1.6, Math.sin(a) * 1.6, 1.25, KISSES);
    }
    for (let i = 0; i < 4; i++) FX.emoji(r.left + r.width / 2, r.top, rand(-.8, .8), -1, 1, KISSES);
  });
  $('#replay').addEventListener('click', replay);

  /* ── together counter ──────────────────────────────────────────── */

  let counterTimer = 0;
  function parseStart(s) {
    if (!has(s)) return null;
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s.trim());
    const d = m ? new Date(+m[1], +m[2] - 1, +m[3]) : new Date(s);
    return isNaN(d) ? null : d;
  }
  function startCounter() {
    const box = $('#counter');
    clearInterval(counterTimer);
    const start = parseStart(C.startDate);
    if (!start) { box.innerHTML = ph('add your start date in content.js'); return; }

    const units = [['days', 864e5]];
    box.innerHTML = units.map(([k]) => `<div class="cell"><b data-k="${k}"></b><span>${esc(UI[k])}</span></div>`).join('');
    const els = Object.fromEntries(units.map(([k]) => [k, box.querySelector(`[data-k="${k}"]`)]));

    const tick = () => {
      let diff = Math.abs(Date.now() - start);
      for (const [k, ms] of units) {
        const n = Math.floor(diff / ms);
        diff -= n * ms;
        const v = k === 'days' ? n.toLocaleString() : String(n).padStart(2, '0');
        if (els[k].textContent !== v) { els[k].textContent = v; restart(els[k], 'tick'); }
      }
    };
    tick();
    counterTimer = setInterval(tick, 1000);
  }

  /* ── canvas helpers ────────────────────────────────────────────── */

  function fitCanvas(cv, ctx) {
    const w = window.innerWidth, h = window.innerHeight;
    cv.width = Math.round(w * DPR);
    cv.height = Math.round(h * DPR);
    cv.style.width = w + 'px';
    cv.style.height = h + 'px';
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    return [w, h];
  }
  function drawHeart(ctx, size) {
    const k = size / 24;
    ctx.scale(k, k);
    ctx.translate(-12, -12);
    ctx.fill(HEART_PATH);
  }
  function drawSparkle(ctx, r) {
    ctx.beginPath();
    ctx.moveTo(0, -r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.quadraticCurveTo(0, 0, 0, r);
    ctx.quadraticCurveTo(0, 0, -r, 0);
    ctx.quadraticCurveTo(0, 0, 0, -r);
    ctx.fill();
  }

  /* ── floating hearts background ────────────────────────────────── */

  const BG = (() => {
    const cv = $('#bg'), ctx = cv.getContext('2d');
    const COLORS = ['#ffffff', '#ffe3e9', '#ffc6d3', '#f5a3b5', '#ffdccb', '#ee8ea2'];
    let w = 0, h = 0, items = [];

    const make = initial => {
      const d = Math.random();
      return {
        x: rand(0, w), y: initial ? rand(0, h) : h + rand(20, 80),
        size: 7 + d * d * 26, vy: .12 + d * .5,
        sway: rand(8, 30), sf: rand(.15, .5), ph: rand(0, 6.28),
        alpha: .16 + d * .5,
        kind: Math.random() < .74 ? 'heart' : 'dot',
        color: pick(COLORS)
      };
    };

    return {
      fit() {
        [w, h] = fitCanvas(cv, ctx);
        const n = reduce ? 10 : Math.round(clamp((w * h) / 26000, 16, 56));
        items = Array.from({ length: n }, () => make(true));
      },
      draw(now, k) {
        ctx.clearRect(0, 0, w, h);
        const t = now * .001;
        for (const it of items) {
          it.y -= it.vy * k * (reduce ? .3 : 1);
          if (it.y < -40) Object.assign(it, make(false));
          const x = it.x + Math.sin(t * it.sf * 2 + it.ph) * it.sway;
          ctx.globalAlpha = it.alpha;
          ctx.fillStyle = it.color;
          if (it.kind === 'heart') {
            ctx.save();
            ctx.translate(x, it.y);
            ctx.rotate(Math.sin(t * it.sf + it.ph) * .35);
            drawHeart(ctx, it.size);
            ctx.restore();
          } else {
            ctx.beginPath();
            ctx.arc(x, it.y, it.size * .16, 0, 7);
            ctx.fill();
          }
        }
        ctx.globalAlpha = 1;
      }
    };
  })();

  /* ── particle effects (bursts, sparkles, confetti) ─────────────── */

  const FX = (() => {
    const cv = $('#fx'), ctx = cv.getContext('2d');
    const ROSE = ['#e8607d', '#f28aa0', '#ffb3c4', '#d94a6a', '#ffd1dc', '#c9a36a'];
    let w = 0, h = 0;
    const P = [];
    const add = p => { if (P.length < 700) P.push(Object.assign({ drag: 1, rot: 0, vr: 0, sway: 0, ph: 0, age: 0 }, p)); };

    // emoji are rendered once to small canvases; drawing text every frame is slow
    const EMOJI = ['🦤', '🦤', '🦤', '💩', '💩'];
    const sprites = {};
    const sprite = ch => {
      if (sprites[ch]) return sprites[ch];
      const c = document.createElement('canvas');
      c.width = c.height = 128;
      const g = c.getContext('2d');
      g.font = '100px "Apple Color Emoji", "Segoe UI Emoji", "Noto Color Emoji", sans-serif';
      g.textAlign = 'center';
      g.textBaseline = 'middle';
      g.fillText(ch, 64, 70);
      return (sprites[ch] = c);
    };
    const backOut = t => 1 + 2.7 * Math.pow(t - 1, 3) + 1.7 * Math.pow(t - 1, 2);

    return {
      fit() { [w, h] = fitCanvas(cv, ctx); },
      // a dodo or a poop springs out of (x, y), flung along (dx, dy)
      emoji(x, y, dx = 0, dy = -1, power = 1, chars = EMOJI) {
        const sp = rand(1.4, 3) * power;
        add({
          x, y, vx: dx * sp + rand(-.6, .6), vy: dy * sp - rand(1.5, 3) * power, g: .045, drag: .985,
          life: 1, decay: rand(.0055, .008), size: rand(28, 44) * Math.min(1.25, power),
          rot: rand(-.25, .25), vr: rand(-.025, .025),
          kind: 'emoji', ch: pick(chars)
        });
      },
      spark(x, y) {
        add({
          x, y, vx: rand(-.5, .5), vy: rand(-.8, .1), g: .025, drag: .98,
          life: 1, decay: rand(.02, .035), size: rand(6, 10),
          rot: rand(0, 6.28), vr: rand(-.05, .05),
          kind: Math.random() < .4 ? 'heart' : 'star',
          color: pick(['#ffffff', '#ffe1e8', '#ffc2d1', '#f3d9a4'])
        });
      },
      burst(x, y, n = 24, power = 1) {
        for (let i = 0; i < n; i++) {
          const a = rand(0, Math.PI * 2), sp = rand(2, 7) * power;
          add({
            x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 1.5 * power, g: .12, drag: .96,
            life: 1, decay: rand(.012, .022), size: rand(8, 17) * Math.max(.6, power),
            rot: rand(-.4, .4), vr: rand(-.06, .06),
            kind: Math.random() < .8 ? 'heart' : 'star', color: pick(ROSE)
          });
        }
      },
      confetti(n = 120) {
        for (let i = 0; i < n; i++) {
          add({
            x: rand(0, w), y: rand(-h * .6, -20), vx: rand(-1, 1), vy: rand(1.5, 3.2), g: .015, drag: .995,
            life: 1, decay: rand(.0025, .004), size: rand(7, 13),
            rot: rand(0, 6.28), vr: rand(-.08, .08), sway: rand(.5, 1.6), ph: rand(0, 6.28),
            kind: pick(['heart', 'heart', 'rect', 'rect', 'dot']),
            color: pick(ROSE.concat(['#ffffff', '#f7e7c1']))
          });
        }
      },
      floatUp(n = 24) {
        for (let i = 0; i < n; i++) {
          add({
            x: rand(w * .08, w * .92), y: h + rand(10, 240), vx: rand(-.3, .3), vy: rand(-2.6, -1.4), g: -.004,
            life: 1, decay: rand(.004, .007), size: rand(12, 26),
            rot: rand(-.3, .3), sway: rand(.6, 1.4), ph: rand(0, 6.28),
            kind: 'heart', color: pick(ROSE)
          });
        }
      },
      draw(now, k) {
        ctx.clearRect(0, 0, w, h);
        for (let i = P.length - 1; i >= 0; i--) {
          const p = P[i];
          const drag = Math.pow(p.drag, k);
          p.vx *= drag; p.vy *= drag; p.vy += p.g * k;
          p.x += (p.vx + (p.sway ? Math.sin(now * .002 + p.ph) * p.sway * .6 : 0)) * k;
          p.y += p.vy * k;
          p.rot += p.vr * k;
          p.life -= p.decay * k;
          p.age += k / 60;
          if (p.life <= 0 || p.y > h + 60) { P.splice(i, 1); continue; }

          ctx.globalAlpha = Math.min(1, p.life * 2);
          ctx.fillStyle = p.color;
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          if (p.kind === 'emoji') {
            const s = p.size * backOut(Math.min(1, p.age / .45)) * (1 + .06 * Math.sin(p.age * 9));
            ctx.drawImage(sprite(p.ch), -s / 2, -s / 2, s, s);
          }
          else if (p.kind === 'heart') drawHeart(ctx, p.size);
          else if (p.kind === 'star') drawSparkle(ctx, p.size * .5);
          else if (p.kind === 'rect') { ctx.scale(1, Math.cos(now * .004 + p.ph)); ctx.fillRect(-p.size * .35, -p.size * .18, p.size * .7, p.size * .36); }
          else { ctx.beginPath(); ctx.arc(0, 0, p.size * .25, 0, 7); ctx.fill(); }
          ctx.restore();
        }
        ctx.globalAlpha = 1;
      }
    };
  })();

  /* ── finale: stars gathering into a heart ──────────────────────── */

  const Stars = (() => {
    const cv = $('#stars'), ctx = cv.getContext('2d');
    let w = 0, h = 0, stars = [], shooters = [], running = false, t0 = 0, boost = 0, nextShoot = 0, nextPop = 0;
    let geo = { cx: 0, cy: 0, s: 1 };

    const glow = (() => {
      const c = document.createElement('canvas');
      c.width = c.height = 64;
      const g = c.getContext('2d');
      const gr = g.createRadialGradient(32, 32, 0, 32, 32, 32);
      gr.addColorStop(0, 'rgba(255,255,255,1)');
      gr.addColorStop(.16, 'rgba(255,230,238,.9)');
      gr.addColorStop(.42, 'rgba(255,150,182,.25)');
      gr.addColorStop(1, 'rgba(255,150,182,0)');
      g.fillStyle = gr;
      g.fillRect(0, 0, 64, 64);
      return c;
    })();

    // classic heart curve, re-centred on its bounding box
    const heartXY = t => [
      16 * Math.sin(t) ** 3,
      -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) - 2.5
    ];

    const outline = Array.from({ length: 120 }, (_, i) => heartXY((i / 120) * Math.PI * 2));
    const insideHeart = (x, y) => {
      let c = false;
      for (let i = 0, j = outline.length - 1; i < outline.length; j = i++) {
        const [xi, yi] = outline[i], [xj, yj] = outline[j];
        if ((yi > y) !== (yj > y) && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
      }
      return c;
    };

    function measure() {
      const top = $('#finale-content').getBoundingClientRect().top;
      const avail = clamp(top, h * .28, h * .62);
      const size = Math.min(w * .66, avail * .74, 440);
      geo = { cx: w / 2, cy: avail * .5, s: size / 32 };
    }

    function build() {
      const n = reduce ? 160 : (w < 640 ? 260 : 380);
      const inHeart = Math.round(n * .62);
      stars = [];
      for (let i = 0; i < n; i++) {
        const heart = i < inHeart;
        let hx = 0, hy = 0;
        if (heart && i < inHeart * .62) {
          const k = 1 + rand(-.025, .025);
          [hx, hy] = heartXY(rand(0, Math.PI * 2)).map(v => v * k);
        } else if (heart) {
          do { hx = rand(-16, 16); hy = rand(-15, 15); } while (!insideHeart(hx * 1.12, hy * 1.12));
        }
        stars.push({
          fx: Math.random(), fy: Math.random(), hx, hy, heart,
          r: heart ? rand(.9, 1.9) : rand(.4, 1.5), a: rand(.4, 1),
          ph: rand(0, 6.28), tw: rand(1, 3), delay: rand(0, .9), curve: rand(-80, 80)
        });
      }
    }

    function fit() { [w, h] = fitCanvas(cv, ctx); measure(); }

    function draw(now, k) {
      if (!running) return;
      const el = (now - t0) / 1000;
      const { cx, cy, s } = geo;
      ctx.clearRect(0, 0, w, h);

      const conv = clamp((el - .5) / 3, 0, 1);
      const phase = (el % 1.15) / 1.15;
      const beat = Math.exp(-(((phase - .08) / .045) ** 2)) + .55 * Math.exp(-(((phase - .27) / .05) ** 2));
      boost *= Math.pow(.93, k);
      const pulse = 1 + (.035 * beat + boost) * easeOut(conv);

      if (conv > 0) {
        const R = s * 24 * (1 + boost);
        const a = .28 * easeOut(conv) * (.85 + .3 * beat);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
        g.addColorStop(0, `rgba(255,110,150,${a})`);
        g.addColorStop(.6, `rgba(255,110,150,${a * .35})`);
        g.addColorStop(1, 'rgba(255,110,150,0)');
        ctx.fillStyle = g;
        ctx.fillRect(cx - R, cy - R, R * 2, R * 2);
      }

      ctx.globalCompositeOperation = 'lighter';
      for (const st of stars) {
        const tw = .55 + .45 * Math.sin(el * st.tw + st.ph);
        let x = st.fx * w, y = st.fy * h, size, alpha;
        if (st.heart) {
          const p = easeInOut(clamp((el - .5 - st.delay) / 2.8, 0, 1));
          x = lerp(x, cx + st.hx * s * pulse, p) + Math.sin(p * Math.PI) * st.curve;
          y = lerp(y, cy + st.hy * s * pulse, p);
          size = st.r * (5 + 3 * p) * (.75 + .25 * tw);
          alpha = (.45 + .55 * tw) * (.6 + .4 * p);
        } else {
          x += Math.sin(el * .2 + st.ph) * 3;
          size = st.r * 5 * (.6 + .4 * tw);
          alpha = st.a * (.25 + .75 * tw) * .8;
        }
        ctx.globalAlpha = alpha;
        ctx.drawImage(glow, x - size / 2, y - size / 2, size, size);
      }

      // once the heart has formed, it keeps popping out dodos and poops
      if (el > 4.4 && el > nextPop) {
        nextPop = el + rand(.45, 1.1);
        const pt = outline[(Math.random() * outline.length) | 0];
        const x = cx + pt[0] * s * pulse, y = cy + pt[1] * s * pulse;
        const len = Math.hypot(pt[0], pt[1]) || 1;
        FX.emoji(x, y, pt[0] / len, pt[1] / len);
      }

      if (el > nextShoot && !reduce) {
        nextShoot = el + rand(2.5, 6);
        shooters.push({ x: rand(w * .1, w * .9), y: rand(0, h * .35), vx: rand(5, 8) * (Math.random() < .5 ? -1 : 1), vy: rand(2, 3.5), life: 1 });
      }
      ctx.globalAlpha = 1;
      ctx.lineWidth = 1.6;
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x += sh.vx * k; sh.y += sh.vy * k; sh.life -= .018 * k;
        if (sh.life <= 0) { shooters.splice(i, 1); continue; }
        const tx = sh.x - sh.vx * 10, ty = sh.y - sh.vy * 10;
        const g = ctx.createLinearGradient(sh.x, sh.y, tx, ty);
        g.addColorStop(0, `rgba(255,240,245,${sh.life})`);
        g.addColorStop(1, 'rgba(255,240,245,0)');
        ctx.strokeStyle = g;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tx, ty);
        ctx.stroke();
      }
      ctx.globalCompositeOperation = 'source-over';
    }

    return {
      start() { fit(); build(); shooters = []; running = true; t0 = performance.now(); nextShoot = 4; nextPop = 0; },
      stop() { running = false; ctx.clearRect(0, 0, w, h); },
      fit() { if (running) fit(); },
      draw,
      kiss() { boost = .22; return { x: geo.cx, y: geo.cy }; }
    };
  })();

  /* ── global delight: cursor sparkles & tap hearts ──────────────── */

  let lastX = null, lastY = null;
  window.addEventListener('pointermove', e => {
    if (reduce) return;
    if (lastX === null) { lastX = e.clientX; lastY = e.clientY; return; }
    if (Math.hypot(e.clientX - lastX, e.clientY - lastY) > 14) {
      FX.spark(e.clientX, e.clientY);
      lastX = e.clientX; lastY = e.clientY;
    }
  }, { passive: true });

  window.addEventListener('pointerdown', e => {
    if (e.target.closest('button, .reason, .sticker, [data-img], .envelope, .lightbox')) return;
    FX.burst(e.clientX, e.clientY, 6, .45);
  }, { passive: true });

  document.addEventListener('keydown', e => {
    if (lightbox.classList.contains('open')) {
      if (e.key === 'Escape') lightbox.classList.remove('open');
      return;
    }
    if (scene === 'envelope' && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openEnvelope(); }
    else if (scene === 'book') {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') next();
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') prev();
    }
  });

  /* ── boot ──────────────────────────────────────────────────────── */

  if (has(C.tabTitle)) document.title = C.tabTitle;
  const env = C.envelope || {};
  $('#env-kicker').innerHTML = txt(env.kicker, 'a little line');
  $('#env-to').innerHTML = txt(env.to, 'her name');
  $('#env-hint').textContent = UI.tapSeal;
  bookHint.textContent = UI.turnHint;

  const F = C.finale || {};
  $('#f-kicker').innerHTML = txt(F.kicker, 'a small line');
  $('#f-title').innerHTML = txt(F.title, 'the big words');
  $('#f-msg').innerHTML = txt(F.message, 'your closing message');
  $('#counter-label').textContent = UI.counterLabel;
  $('#kiss').innerHTML = `${svgHeart()}<span>${esc(UI.kiss)}</span>`;
  $('#replay').textContent = UI.replay;

  buildBook();
  layout();
  fitText();
  document.fonts.ready.then(fitText);
  BG.fit();
  FX.fit();

  let resizeRaf = 0;
  window.addEventListener('resize', () => {
    cancelAnimationFrame(resizeRaf);
    resizeRaf = requestAnimationFrame(() => { layout(); fitText(); BG.fit(); FX.fit(); Stars.fit(); });
  });

  // physics is tuned for 60fps; k rescales it so 120Hz screens don't run double speed
  let last = performance.now();
  const loop = now => {
    const k = clamp((now - last) / (1000 / 60), 0, 3);
    last = now;
    BG.draw(now, k);
    FX.draw(now, k);
    Stars.draw(now, k);
    requestAnimationFrame(loop);
  };
  requestAnimationFrame(loop);
})();
