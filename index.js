function rectsOverlap(a, b, gap = 10) {
  return !(
    a.right + gap < b.left ||
    a.left > b.right + gap ||
    a.bottom + gap < b.top ||
    a.top > b.bottom + gap
  );
}

function fadeInVideoSound(video, targetVolume = 1, duration = 2500) {
  video.volume = 0;
  const steps = 30;
  const stepTime = duration / steps;
  let currentStep = 0;

  const fade = setInterval(() => {
    currentStep++;
    video.volume = Math.min(
      targetVolume,
      (targetVolume / steps) * currentStep
    );

    if (currentStep >= steps) {
      clearInterval(fade);
      video.volume = targetVolume;
    }
  }, stepTime);
}

function yesClick() {
  document.body.innerHTML = `
    <div class="videoWrapper">
      <video
        id="loveVideo"
        class="fullVideo"
        src="video/lv_7256694716505378049_20260212172752.mp4"
        playsinline
      ></video>

      <div class="overlayText">
        <div class="title">HAHAHAHA kakakilig 🥰💕</div>
        <img class="overlayGif" src="assets/Qoobee Sticker by Inlove.gif" alt="cute cat" />
        <div class="sub">wala ng bawian yan ah hahahaha🤣</div>
      </div>
    </div>
  `;

  const video = document.getElementById("loveVideo");

  video.muted = false;
  video.volume = 0;

  video.play().then(() => {
    fadeInVideoSound(video, 1, 3000);
  }).catch(() => {
    // if autoplay fails (rare in this method), try again
    video.muted = false;
    video.play();
  });
}

function moveNo() {
  if (navigator.vibrate) navigator.vibrate([60, 40, 60]);

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  noBtn.style.position = "fixed";

  const tries = 80;
  const margin = 8;

  const noW = noBtn.offsetWidth;
  const noH = noBtn.offsetHeight;

  for (let i = 0; i < tries; i++) {
    const x = margin + Math.random() * (window.innerWidth - noW - margin * 2);
    const y = margin + Math.random() * (window.innerHeight - noH - margin * 2);

    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;

    const noRect = noBtn.getBoundingClientRect();
    const yesRect = yesBtn.getBoundingClientRect();

    if (!rectsOverlap(noRect, yesRect, 14)) return;
  }
}

document.getElementById("yesBtn").addEventListener("click", yesClick);
document.getElementById("noBtn").addEventListener("click", moveNo);
