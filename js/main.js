(function () {
  document.documentElement.classList.add("js");
  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* nav: solid after scrolling, mobile menu, active link */
  var nav = document.getElementById("nav");
  var burger = document.getElementById("burger");
  function onScroll() { nav.classList.toggle("solid", window.scrollY > 40 || nav.classList.contains("open")); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  function setMenu(open) {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.style.overflow = open ? "hidden" : "";
    onScroll();
  }
  burger.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
  Array.prototype.forEach.call(document.querySelectorAll("#nav-links a"), function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });

  if ("IntersectionObserver" in window) {
    /* reveal on scroll */
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) { io.observe(el); });
  } else {
    Array.prototype.forEach.call(document.querySelectorAll(".reveal"), function (el) { el.classList.add("in"); });
  }

  /* countdown to race week (Jan 27, 2027, Edmonton time) */
  var target = new Date("2027-01-27T00:00:00-07:00").getTime();
  var ids = { d: "cd-d", h: "cd-h", m: "cd-m", s: "cd-s" };
  function pad(n) { return n < 10 ? "0" + n : String(n); }
  function tick() {
    var diff = Math.max(0, target - Date.now());
    var d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60, s = Math.floor(diff / 1e3) % 60;
    document.getElementById(ids.d).textContent = d;
    document.getElementById(ids.h).textContent = pad(h);
    document.getElementById(ids.m).textContent = pad(m);
    document.getElementById(ids.s).textContent = pad(s);
  }
  if (document.getElementById(ids.d)) { tick(); setInterval(tick, 1000); }

  /* timeline: past steps are done, the first step still running is in progress */
  var items = document.querySelectorAll("#tl li");
  var now = Date.now(), found = false;
  Array.prototype.forEach.call(items, function (li) {
    var end = new Date(li.getAttribute("data-end") + "T23:59:59-07:00").getTime();
    if (end < now) li.classList.add("done");
    else if (!found) { li.classList.add("now"); found = true; }
    else li.classList.add("next");
  });

  /* stat count-up */
  if (!reduce && "IntersectionObserver" in window) {
    var cu = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        cu.unobserve(en.target);
        var el = en.target, end = parseInt(el.getAttribute("data-count"), 10), suf = el.getAttribute("data-suffix") || "";
        var start = performance.now(), dur = 1200;
        (function step(t) {
          var p = Math.min(1, (t - start) / dur), v = Math.round(end * (1 - Math.pow(1 - p, 3)));
          el.textContent = v + (p === 1 ? suf : "");
          if (p < 1) requestAnimationFrame(step);
        })(start);
      });
    }, { threshold: 0.6 });
    Array.prototype.forEach.call(document.querySelectorAll("[data-count]"), function (el) { cu.observe(el); });
  }

  /* gallery lightbox */
  var lb = document.getElementById("lightbox"), lbImg = document.getElementById("lb-img");
  if (lb) Array.prototype.forEach.call(document.querySelectorAll(".ph"), function (btn) {
    btn.addEventListener("click", function () {
      var img = btn.querySelector("img");
      lbImg.src = img.currentSrc || img.src; lbImg.alt = img.alt;
      if (lb.showModal) lb.showModal(); else lb.setAttribute("open", "");
    });
  });
  function closeLb() { if (lb.close) lb.close(); else lb.removeAttribute("open"); }
  if (lb) {
    document.getElementById("lb-close").addEventListener("click", closeLb);
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  }

  /* copy letter template */
  var status = document.getElementById("copy-status");
  var copyBtn = document.getElementById("copy-letter");
  if (copyBtn) copyBtn.addEventListener("click", function () {
    var node = document.getElementById("letter-text");
    function fallback() {
      var range = document.createRange(); range.selectNodeContents(node);
      var sel = window.getSelection(); sel.removeAllRanges(); sel.addRange(range);
      status.textContent = "Letter selected. Press Ctrl+C (or Cmd+C) to copy.";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(node.textContent).then(function () { status.textContent = "Copied to clipboard."; }, fallback);
    } else { fallback(); }
  });
})();
