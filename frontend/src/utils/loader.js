let initialized = false;
let anim = null;
let initPromise = null;

function getAnimationDataUrl() {
  // path to Lottie JSON (encode spaces)
  return "/images/" + encodeURIComponent("Trator verde.json");
}

async function init() {
  if (initialized) return;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const container = document.getElementById("lottie-container");
    if (!container) return;

    try {
      // Ensure lottie is available (loaded from CDN in index.html)
      const lottie = window.lottie;
      if (!lottie) {
        console.warn(
          "lottie not found on window; loader will be fallback to static",
        );
        return;
      }

      const url = getAnimationDataUrl();
      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch animation JSON");
      const data = await res.json();

      anim = lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: true,
        animationData: data,
      });

      initialized = true;
    } catch (e) {
      console.error("Failed to init loader animation", e);
    }
  })();

  return initPromise;
}

export async function showLoader() {
  await init();
  const el = document.getElementById("global-loader");
  if (!el) return;
  el.style.display = "flex";
  el.style.opacity = "1";
  if (anim && anim.play)
    try {
      anim.play();
    } catch (e) {}
}

export function hideLoader() {
  const el = document.getElementById("global-loader");
  if (!el) return;
  try {
    el.style.transition = "opacity 300ms ease";
    el.style.opacity = "0";
    setTimeout(() => {
      if (el) el.style.display = "none";
    }, 350);
  } catch (e) {
    el.style.display = "none";
  }
  if (anim && anim.pause)
    try {
      anim.pause();
    } catch (e) {}
}

export default { showLoader, hideLoader };
