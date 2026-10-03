(() => {
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (s, c = document) => [...c.querySelectorAll(s)];

  // Hero name: split into letters for the load-in
  let n = 0;
  $("[data-split]").forEach(el => {
    el.setAttribute("aria-hidden", "true");
    el.innerHTML = [...el.textContent].map(ch => `<span class="c" style="--i:${n++}">${ch}</span>`).join("");
  });

  // Mobile menu
  const burger = $(".burger")[0], menu = $("#menu")[0];
  const setMenu = open => {
    menu.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open);
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  $("a", menu).forEach(a => a.addEventListener("click", () => setMenu(false)));
  addEventListener("keydown", e => e.key === "Escape" && setMenu(false));

  // Reveal on scroll: section titles, spec rows, cards, timeline items
  $(".big, .spec, .stats, .card, .timeline li, .reach, .contact .mail").forEach(el => el.classList.add("rv"));
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    const el = e.target;
    el.classList.add("in");
    if (el.matches(".skills li")) el.querySelector(".gauge i").style.width = el.dataset.level + "%";
    if (el.matches(".stats")) $("[data-count]", el).forEach(count);
    io.unobserve(el);
  }), { threshold: .2 });
  $(".sec-title, .rv, .skills li").forEach(el => io.observe(el));

  function count(el) {
    const end = +el.dataset.count;
    if (reduce) return (el.textContent = end);
    const t0 = performance.now(), dur = 1400;
    const tick = t => {
      const p = Math.min((t - t0) / dur, 1);
      el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  // Scroll-linked: header background, gear rotation, timeline progress
  const bar = $(".bar")[0], gear = $(".gear")[0], tl = $(".timeline")[0];
  let ticking = false;
  const update = () => {
    const y = scrollY;
    bar.classList.toggle("on", y > 40);
    if (!reduce) gear.style.setProperty("--r", y * .12 + "deg");
    const r = tl.getBoundingClientRect();
    const p = (innerHeight * .6 - r.top) / r.height;
    tl.style.setProperty("--p", Math.max(0, Math.min(1, p)) * 100 + "%");
    ticking = false;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update);
  update();
})();
