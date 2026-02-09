function yesClick() {
  const music = document.getElementById("bgMusic");

  // 🎵 Play music (user gesture = allowed on mobile)
  fadeInMusic(music, 0.5, 2500);
  music.play().catch(() => {});

  // Go to "main page" view
  document.body.innerHTML = `
  <div class="mainBg"></div>

  <div class="heroText">
    <div class="title">HAHAHHAHAHAA kakakilig 🥰💕</div>
    <div class="sub">wala ng bawian yan ah hahahaha🤣🤣🤣</div>
    <div class="small">🎶 Tahanan by: El Manu</div>
  </div>
`;

  // IMPORTANT: re-attach the audio element to the new body
  document.body.appendChild(music);
}

function rectsOverlap(a, b, gap = 10) {
  // gap = extra safe space so they don't touch
  return !(
    a.right + gap < b.left ||
    a.left > b.right + gap ||
    a.bottom + gap < b.top ||
    a.top > b.bottom + gap
  );
}

function moveNo() {
  // 📳 Vibrate (if supported)
  if (navigator.vibrate) navigator.vibrate([60, 40, 60]);

  const noBtn = document.getElementById("noBtn");
  const yesBtn = document.getElementById("yesBtn");

  // First time it runs: detach from layout and allow roaming
  noBtn.style.position = "fixed";
  noBtn.style.transform = "none";

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

    // accept only if it doesn't overlap YES
    if (!rectsOverlap(noRect, yesRect, 14)) return;
  }

  // fallback: bottom-right-ish
  noBtn.style.left = `${Math.max(margin, window.innerWidth - noW - margin)}px`;
  noBtn.style.top = `${Math.max(margin, window.innerHeight - noH - margin)}px`;
}

function fadeInMusic(audio, targetVolume = 0.6, duration = 2000) {
  audio.volume = 0;
  audio.play().catch(() => {});

  const steps = 30;
  const stepTime = duration / steps;
  let currentStep = 0;

  const fade = setInterval(() => {
    currentStep++;
    audio.volume = Math.min(targetVolume, (targetVolume / steps) * currentStep);

    if (currentStep >= steps) {
      clearInterval(fade);
      audio.volume = targetVolume;
    }
  }, stepTime);
}
