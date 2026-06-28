/*
 * oppal theme — site JavaScript entry point.
 *
 * Concatenated with Bootstrap's bundle (which already includes Popper) into one
 * deferred, fingerprinted file (see partials/footer.html). Keep this small:
 * Bootstrap's bundle drives the navbar collapse, accordions, etc., so the
 * skeleton needs nothing here.
 *
 * Grows over the build phases:
 *   - Phase 1: live countdown init for the reunion date.
 *   - Phase 2+: lazy-load triggers for third-party embeds (Hyvor, PublicAlbum).
 */
(function () {
  "use strict";

  /*
   * Live countdown. Any element with [data-countdown="<ISO date>"] gets a ticking
   * "N days, HH:MM:SS until …" readout. Build-time logic decides whether a
   * countdown element is even on the page (hidden in gap mode), so this just
   * animates whatever it finds. Optional [data-countdown-label] sets the suffix.
   */
  function initCountdowns() {
    var nodes = document.querySelectorAll("[data-countdown]");
    if (!nodes.length) return;

    function render(el, target, label) {
      var diff = target - Date.now();
      if (diff <= 0) {
        el.textContent = label ? "Happening now — " + label : "Happening now";
        return false;
      }
      var s = Math.floor(diff / 1000);
      var days = Math.floor(s / 86400);
      var hrs = Math.floor((s % 86400) / 3600);
      var mins = Math.floor((s % 3600) / 60);
      var secs = s % 60;
      var pad = function (n) { return String(n).padStart(2, "0"); };
      el.textContent =
        days + " days, " + pad(hrs) + ":" + pad(mins) + ":" + pad(secs) +
        (label ? " " + label : "");
      return true;
    }

    nodes.forEach(function (el) {
      var target = new Date(el.getAttribute("data-countdown")).getTime();
      if (isNaN(target)) return;
      var label = el.getAttribute("data-countdown-label") || "";
      if (render(el, target, label) === false) return;
      var id = setInterval(function () {
        if (render(el, target, label) === false) clearInterval(id);
      }, 1000);
    });
  }

  /*
   * Reunion landing sticky section menu: highlight the link for the section in
   * view. Uses Bootstrap's ScrollSpy (already in the bundle). Only spins up when
   * the menu's first target actually exists on this page — so on subpages, where
   * the menu links back to the landing's anchors, it stays inert.
   */
  function initReunionNav() {
    var nav = document.getElementById("reunion-subnav");
    if (!nav || typeof bootstrap === "undefined" || !bootstrap.ScrollSpy) return;
    var first = nav.querySelector(".nav-link");
    if (!first || !first.hash || !document.querySelector(first.hash)) return;
    new bootstrap.ScrollSpy(document.body, {
      target: "#reunion-subnav",
      rootMargin: "0px 0px -55%",
    });
  }

  function init() {
    initCountdowns();
    initReunionNav();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
