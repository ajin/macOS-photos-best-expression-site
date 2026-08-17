/* Best Expression site. Three jobs, nothing else:
   1. the before/after handle
   2. the grease-pencil circle drawing itself in
   3. honest behavior for the not-yet-live store buttons */

(function () {
  "use strict";

  /* before/after ------------------------------------------------ */
  document.querySelectorAll(".compare").forEach(function (box) {
    var range = box.querySelector('input[type="range"]');
    if (!range) return;
    var set = function () {
      box.style.setProperty("--pos", range.value);
    };
    range.addEventListener("input", set);
    set();
  });

  /* draw-on pencil marks ---------------------------------------- */
  var marked = document.querySelectorAll("[data-inview]");
  if ("IntersectionObserver" in window && marked.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("inview");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    marked.forEach(function (el) {
      io.observe(el);
    });
  } else {
    marked.forEach(function (el) {
      el.classList.add("inview");
    });
  }

  /* store buttons before the listing is live ---------------------
     Once the real App Store URL replaces href="#", this whole block
     steps aside and the buttons become plain links. */
  document.querySelectorAll('a.btn-primary[href="#"]').forEach(function (btn) {
    var label = btn.querySelector(".label");
    var original = label ? label.textContent : "";
    var timer = null;
    btn.addEventListener("click", function (ev) {
      ev.preventDefault();
      if (!label) return;
      btn.classList.add("is-waiting");
      label.textContent = btn.getAttribute("data-wait") || "Soon";
      clearTimeout(timer);
      timer = setTimeout(function () {
        btn.classList.remove("is-waiting");
        label.textContent = original;
      }, 2400);
    });
  });
})();
