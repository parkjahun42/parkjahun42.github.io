(() => {
  const previews = Array.from(document.querySelectorAll("[data-hover-preview]"));
  const hoverQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
  const mobileLayoutQuery = window.matchMedia("(max-width: 820px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const videos = new Map();
  const playTokens = new Map();
  const desktopStates = new Map();
  const ratios = new Map();
  let activePreview = null;
  let chooseMobile = null;
  let scrollPreviewActive = null;

  previews.forEach((preview) => {
    const video = preview.querySelector("video");
    desktopStates.set(preview, { focused: false, hovered: false });
    ratios.set(preview, 0);
    if (video) {
      videos.set(preview, video);
      playTokens.set(preview, 0);
    }
  });

  const setCue = (preview, text) => {
    const label = preview.querySelector(".jp-preview-cue span");
    if (label) label.textContent = text;
  };

  const stop = (preview) => {
    const video = videos.get(preview);
    if (!video) return;

    playTokens.set(preview, (playTokens.get(preview) || 0) + 1);
    video.pause();
    try {
      video.currentTime = 0;
    } catch {
      // Metadata may not be available yet.
    }
    preview.classList.remove("is-playing");
    if (activePreview === preview) activePreview = null;
  };

  const play = (preview) => {
    const video = videos.get(preview);
    if (!video || (activePreview === preview && !video.paused)) return;

    if (activePreview && activePreview !== preview) stop(activePreview);
    activePreview = preview;
    video.muted = true;
    const token = (playTokens.get(preview) || 0) + 1;
    playTokens.set(preview, token);

    const result = video.play();
    if (result && typeof result.then === "function") {
      result
        .then(() => {
          if (playTokens.get(preview) !== token) return;

          if (activePreview === preview && playTokens.get(preview) === token && !video.paused) {
            preview.classList.add("is-playing");
          } else {
            video.pause();
          }
        })
        .catch(() => {
          if (playTokens.get(preview) !== token) return;

          preview.classList.remove("is-playing");
          if (activePreview === preview) activePreview = null;
        });
    } else {
      preview.classList.add("is-playing");
    }
  };

  const usesScrollPreview = () => mobileLayoutQuery.matches || !hoverQuery.matches;

  if (reduceMotion) {
    previews.forEach((preview) => setCue(preview, "Open project"));
    return;
  }

  const syncDesktop = (preferred) => {
    if (usesScrollPreview()) return;

    const preferredState = desktopStates.get(preferred);
    const candidate =
      preferredState && (preferredState.focused || preferredState.hovered)
        ? preferred
        : previews.find((preview) => {
            const state = desktopStates.get(preview);
            return state && (state.focused || state.hovered);
          });

    if (candidate) play(candidate);
    else if (activePreview) stop(activePreview);
  };

  previews.forEach((preview) => {
    if (!videos.has(preview)) return;

    const link = preview.closest(".jp-research-media");
    const state = desktopStates.get(preview);
    const hoverTarget = link || preview;
    const setHovered = (hovered) => {
      state.hovered = hovered;
      syncDesktop(preview);
    };

    hoverTarget.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "touch") return;
      setHovered(true);
    });
    hoverTarget.addEventListener("pointerleave", (event) => {
      if (event.pointerType === "touch") return;
      setHovered(false);
    });
    hoverTarget.addEventListener("mouseenter", () => setHovered(true));
    hoverTarget.addEventListener("mouseleave", () => setHovered(false));
    if (link) {
      link.addEventListener("focus", () => {
        state.focused = true;
        syncDesktop(preview);
      });
      link.addEventListener("blur", () => {
        state.focused = false;
        syncDesktop(preview);
      });
    }
  });

  if ("IntersectionObserver" in window) {
    chooseMobile = () => {
      if (!usesScrollPreview() || document.hidden) return;

      const [candidate, ratio = 0] = [...ratios.entries()].sort((a, b) => b[1] - a[1])[0] || [];
      if (candidate && ratio >= 0.55) play(candidate);
      else if (activePreview) stop(activePreview);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => ratios.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0));
        chooseMobile();
      },
      {
        rootMargin: "-8% 0px -12% 0px",
        threshold: [0, 0.25, 0.5, 0.55, 0.65, 0.75, 1],
      }
    );

    previews.forEach((preview) => {
      if (videos.has(preview)) observer.observe(preview);
    });
  }

  const syncMode = () => {
    const nextScrollPreviewActive = usesScrollPreview();
    if (scrollPreviewActive === nextScrollPreviewActive) return;

    scrollPreviewActive = nextScrollPreviewActive;
    if (activePreview) stop(activePreview);

    if (scrollPreviewActive) {
      previews.forEach((preview) => setCue(preview, "Scroll to preview"));
      if (chooseMobile) chooseMobile();
    } else {
      previews.forEach((preview) => setCue(preview, "Hover to preview"));
      syncDesktop();
    }
  };

  const addMediaListener = (query) => {
    if (typeof query.addEventListener === "function") query.addEventListener("change", syncMode);
    else if (typeof query.addListener === "function") query.addListener(syncMode);
  };

  addMediaListener(hoverQuery);
  addMediaListener(mobileLayoutQuery);
  syncMode();

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && activePreview) stop(activePreview);
    else if (!document.hidden) {
      if (usesScrollPreview() && chooseMobile) chooseMobile();
      else syncDesktop();
    }
  });
  window.addEventListener("pagehide", () => {
    if (activePreview) stop(activePreview);
  });
})();
