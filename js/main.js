/* Edit these when you have the details. Leave a link as "" to show "coming soon". */
var CONFIG = {
  packageUrl: "",
  instagramUrl: "https://www.instagram.com/gnctr_nait/",
  instagramHandle: "@gnctr_nait"
};
var EXEC = [
  { name: "Aaron Smith", role: "President", photo: "assets/img/team/aaron-smith.jpg" },
  { name: "Thilan Wijesinghe", role: "VP Finances", photo: "assets/img/team/thilan-wijesinghe.jpg" },
  { name: "Tina Trieu", role: "VP Operations", photo: "assets/img/team/tina-trieu.jpg" }
];
var LEADERS = [
  { name: "Fouzi Ali", role: "Concrete Lead", photo: "assets/img/team/fouzi-ali.jpg" },
  { name: "Connor Volk", role: "Concrete Lead", photo: "assets/img/team/connor-volk.jpg" },
  { name: "JohnDaniel Rafio", role: "Mechanical Lead", photo: "assets/img/team/johndaniel-rafio.jpg" },
  { name: "Tony Lombardo", role: "Safety Lead" },
  { name: "Jennifer Huynh", role: "Spirit Lead" },
  { name: "Evelyn Gow", role: "Spirit Co-Lead" }
];

(function () {
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text) e.textContent = text;
    return e;
  }
  var GLYPH = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8z"/></svg>';
  function initials(n) {
    return n.split(/\s+/).filter(Boolean).slice(0, 2).map(function (s) { return s[0].toUpperCase(); }).join("");
  }
  function renderPeople(list, mountId) {
    var mount = document.getElementById(mountId);
    list.forEach(function (p) {
      var card = el("div", "card person");
      var av = el("div", "avatar");
      if (p.photo) {
        av.className = "avatar has-photo";
        var im = document.createElement("img");
        im.src = p.photo; im.alt = p.name; im.width = 96; im.height = 96;
        av.appendChild(im);
      } else if (p.name) av.textContent = initials(p.name); else av.innerHTML = GLYPH;
      var info = el("div");
      info.appendChild(el("b", p.name ? "" : "tbd", p.name || "Name to be added"));
      info.appendChild(el("span", "", p.role));
      card.appendChild(av);
      card.appendChild(info);
      mount.appendChild(card);
    });
  }
  renderPeople(EXEC, "exec-grid");
  renderPeople(LEADERS, "leader-grid");


  /* Gallery lightbox */
  (function () {
    var lb = document.getElementById("lightbox"); if (!lb) return;
    var big = lb.querySelector("img");
    Array.prototype.forEach.call(document.querySelectorAll(".g-item"), function (b) {
      b.addEventListener("click", function () {
        var im = b.querySelector("img"); big.src = im.src; big.alt = im.alt;
        if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
      });
    });
    function close() { if (lb.close) lb.close(); else lb.removeAttribute("open"); }
    document.getElementById("lb-close").addEventListener("click", close);
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
  })();

  /* Scroll interactions: reveal on scroll, progress bar, parallax, cursor glow */
  (function () {
    var root = document.documentElement;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var sel = "#page-about .photo-row, #page-about .spec, #page-about .three > *, .panel, .cards > .card, .tier-box, .chip, .page > div:first-child, .grid > *";
    var items = Array.prototype.slice.call(document.querySelectorAll(sel));
    if ("IntersectionObserver" in window && !reduce) {
      root.classList.add("js");
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (!en.isIntersecting) return;
          var t = en.target, sibs = t.parentElement ? Array.prototype.filter.call(t.parentElement.children, function (c) { return c.classList.contains("reveal"); }) : [t];
          t.style.setProperty("--d", Math.min(sibs.indexOf(t), 6) * 80 + "ms");
          t.classList.add("in"); io.unobserve(t);
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      items.forEach(function (n) { n.classList.add("reveal"); io.observe(n); });
    }
    var bar = document.getElementById("scroll-progress"), logo = document.querySelector("#page-about .hero > :last-child");
    if (logo) logo.classList.add("parallax");
    var ticking = false;
    function tick() {
      ticking = false;
      var y = window.pageYOffset || root.scrollTop, max = Math.max(1, root.scrollHeight - window.innerHeight);
      if (bar) bar.style.transform = "scaleX(" + Math.min(1, y / max) + ")";
      root.style.setProperty("--sy", y);
      if (logo && !reduce) logo.style.transform = "translate3d(0," + Math.min(y * 0.14, 90) + "px,0) rotate(" + Math.min(y * 0.03, 12) + "deg)";
    }
    window.addEventListener("scroll", function () { if (!ticking) { ticking = true; requestAnimationFrame(tick); } }, { passive: true });
    window.addEventListener("hashchange", function () { window.scrollTo(0, 0); tick(); });
    tick();
    document.addEventListener("pointermove", function (e) {
      var t = e.target.closest ? e.target.closest(".panel, .card, .tier") : null;
      if (!t) return;
      var r = t.getBoundingClientRect();
      t.style.setProperty("--mx", (e.clientX - r.left) + "px");
      t.style.setProperty("--my", (e.clientY - r.top) + "px");
    }, { passive: true });
  })();

  /* Race-week countdown, stat counters, snowfall */
  (function () {
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var target = new Date("2027-01-27T00:00:00-07:00").getTime();
    var cd = {}; Array.prototype.forEach.call(document.querySelectorAll("[data-cd]"), function (n) { cd[n.getAttribute("data-cd")] = n; });
    function pad(n) { return n < 10 ? "0" + n : "" + n; }
    function tickCd() {
      var s = Math.max(0, Math.floor((target - Date.now()) / 1000));
      if (cd.d) { cd.d.textContent = Math.floor(s / 86400); cd.h.textContent = pad(Math.floor(s % 86400 / 3600)); cd.m.textContent = pad(Math.floor(s % 3600 / 60)); cd.s.textContent = pad(s % 60); }
      if (s === 0) { var k = document.querySelector(".rs-kicker"); if (k) k.textContent = "It\u2019s race week"; }
    }
    tickCd(); setInterval(tickCd, 1000);
    var stats = document.querySelectorAll(".stat b");
    function fmt(n, el) { return (el.getAttribute("data-plain") ? "" + n : n.toLocaleString("en-CA")) + (el.getAttribute("data-suffix") || ""); }
    function run(el) {
      var to = +el.getAttribute("data-to"), t0 = null;
      if (reduce) { el.textContent = fmt(to, el); return; }
      function f(ts) { if (!t0) t0 = ts; var p = Math.min(1, (ts - t0) / 1500), e = 1 - Math.pow(1 - p, 3); el.textContent = fmt(Math.round(to * e), el); if (p < 1) requestAnimationFrame(f); }
      requestAnimationFrame(f);
    }
    if ("IntersectionObserver" in window) {
      var so = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { run(e.target); so.unobserve(e.target); } }); }, { threshold: 0.4 });
      Array.prototype.forEach.call(stats, function (s) { so.observe(s); });
    } else Array.prototype.forEach.call(stats, run);
    var cv = document.getElementById("snow"); if (!cv || reduce || !cv.getContext) return;
    var ctx = cv.getContext("2d"), W = 0, H = 0, flakes = [], dpr = Math.min(2, window.devicePixelRatio || 1);
    function size() { W = window.innerWidth; H = window.innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    size(); window.addEventListener("resize", size);
    var n = W < 600 ? 36 : 70;
    for (var i = 0; i < n; i++) flakes.push({ x: Math.random() * W, y: Math.random() * H, r: 1 + Math.random() * 2.6, v: 0.25 + Math.random() * 0.8, p: Math.random() * 6.28 });
    var run2 = true; document.addEventListener("visibilitychange", function () { run2 = !document.hidden; if (run2) requestAnimationFrame(draw); });
    function draw() {
      if (!run2) return;
      ctx.clearRect(0, 0, W, H);
      flakes.forEach(function (f) {
        f.y += f.v; f.p += 0.012; f.x += Math.sin(f.p) * 0.4;
        if (f.y > H + 6) { f.y = -6; f.x = Math.random() * W; }
        ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283);
        ctx.fillStyle = "rgba(255,255,255,.85)"; ctx.fill();
        ctx.strokeStyle = "rgba(20,86,184,.18)"; ctx.lineWidth = 1; ctx.stroke();
      });
      requestAnimationFrame(draw);
    }
    draw();
  })();

  /* Light / dark toggle (follows the device setting until you choose) */
  (function () {
    var root = document.documentElement, btn = document.getElementById("theme-btn"); if (!btn) return;
    var mq = window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    try { var saved = localStorage.getItem("gnctr-theme"); if (saved) root.setAttribute("data-theme", saved); } catch (e) {}
    function isDark() { var t = root.getAttribute("data-theme"); return t ? t === "dark" : !!(mq && mq.matches); }
    function label() { var d = isDark(), t = d ? "Switch to light mode" : "Switch to dark mode"; btn.setAttribute("data-mode", d ? "dark" : "light"); btn.setAttribute("aria-label", t); btn.title = t; }
    btn.addEventListener("click", function () {
      var next = isDark() ? "light" : "dark"; root.setAttribute("data-theme", next);
      try { localStorage.setItem("gnctr-theme", next); } catch (e) {}
      label();
    });
    label();
  })();

  /* Gallery carousel: arrows, drag to scroll, button states */
  (function () {
    var tr = document.getElementById("gallery-track"); if (!tr) return;
    var prev = document.querySelector(".car-btn.prev"), next = document.querySelector(".car-btn.next");
    function upd() { prev.disabled = tr.scrollLeft < 8; next.disabled = tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 8; }
    function step(dir) { tr.scrollBy({ left: dir * Math.max(240, tr.clientWidth * 0.8), behavior: "smooth" }); }
    prev.addEventListener("click", function () { step(-1); });
    next.addEventListener("click", function () { step(1); });
    tr.addEventListener("scroll", upd, { passive: true }); window.addEventListener("resize", upd);
    tr.addEventListener("keydown", function (e) { if (e.key === "ArrowRight") { e.preventDefault(); step(1); } else if (e.key === "ArrowLeft") { e.preventDefault(); step(-1); } });
    var down = false, sx = 0, sl = 0, moved = false;
    tr.addEventListener("pointerdown", function (e) { if (e.pointerType !== "mouse") return; down = true; moved = false; sx = e.clientX; sl = tr.scrollLeft; });
    window.addEventListener("pointermove", function (e) {
      if (!down) return; var dx = e.clientX - sx;
      if (Math.abs(dx) > 5) { moved = true; tr.classList.add("dragging"); }
      if (moved) tr.scrollLeft = sl - dx;
    });
    window.addEventListener("pointerup", function () { if (!down) return; down = false; tr.classList.remove("dragging"); setTimeout(function () { moved = false; }, 0); });
    tr.addEventListener("click", function (e) { if (moved) { e.stopPropagation(); e.preventDefault(); } }, true);
    window.addEventListener("hashchange", function () { setTimeout(upd, 50); }); document.addEventListener("click", function () { setTimeout(upd, 60); });
    upd();
  })();

  /* Home gallery preview: a few photos copied from the Gallery page, each opening that tab */
  (function () {
    var box = document.getElementById("home-gallery"), imgs = document.querySelectorAll("#gallery-track .g-item img");
    if (!box || !imgs.length) return;
    [3, 5, 7, 1].forEach(function (i) {
      var src = imgs[i]; if (!src) return;
      var a = document.createElement("a"); a.className = "g-prev"; a.href = "#gallery"; a.setAttribute("aria-label", "Open the gallery");
      var im = src.cloneNode(true); im.removeAttribute("style"); a.appendChild(im); box.appendChild(a);
    });
  })();

  /* links */
  function external(a, url) { a.href = url; a.target = "_blank"; a.rel = "noopener"; }
  function off(a, text) {
    a.removeAttribute("href");
    a.setAttribute("aria-disabled", "true");
    a.classList.add("is-off");
    var l = a.querySelector(".lbl");
    if (l) l.textContent = text;
  }
  /* tabs */
  var routes = ["about", "team", "sponsors", "gallery", "news"];
  var links = document.querySelectorAll(".nav a");
  function show(rr) {
    var r = typeof rr === "string" ? rr : (location.hash || "").replace("#", "");
    if (routes.indexOf(r) < 0) r = "about";
    routes.forEach(function (id) { document.getElementById("page-" + id).hidden = id !== r; });
    Array.prototype.forEach.call(links, function (a) {
      if (a.getAttribute("data-route") === r) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
    window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", function () { show(); });
  show();
  /* Switch tabs directly on click so they work even where the address bar hash is blocked. */
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest ? ev.target.closest('a[href^="#"]') : null;
    if (!a) return;
    var r = a.getAttribute("href").slice(1);
    if (routes.indexOf(r) < 0) return;
    ev.preventDefault();
    show(r);
    var target = a.getAttribute("data-scroll");
    if (target) {
      var t = document.getElementById(target);
      if (t) setTimeout(function () { t.scrollIntoView({ behavior: "smooth", block: "start" }); }, 30);
    }
    try { history.replaceState(null, "", "#" + r); } catch (e) { try { location.hash = r; } catch (e2) {} }
  });

  /* copy letter */
  var status = document.getElementById("copy-status");
  document.getElementById("copy-letter").addEventListener("click", function () {
    var node = document.getElementById("letter-text");
    var text = node.textContent;
    function fallback() {
      var range = document.createRange();
      range.selectNodeContents(node);
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      status.textContent = "Letter selected. Press Ctrl+C (or Cmd+C) to copy.";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { status.textContent = "Copied to clipboard."; }, fallback);
    } else { fallback(); }
  });
})();
