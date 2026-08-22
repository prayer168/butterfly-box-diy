const slideData = [
  ["蝴蝶飼養觀察箱 DIY", "校園生物多樣性 × 親子手作 × 生命教育"],
  ["課程定位", "對象、場域、核心與探究實作，從看見蝴蝶走向理解生命"],
  ["教學設計", "生命週期、箱體原則、飼養照顧與生態倫理"],
  ["半日營隊流程", "從校園生態導覽，到作品整理與延伸觀察"],
  ["蝴蝶的一生", "卵、幼蟲、蛹與成蝶：觀察變化、時間、行為與環境條件"],
  ["好的觀察箱要做到", "看得清楚、空氣流通、防止逃脫、便於清潔與安全實作"],
  ["材料準備", "紙箱或透明收納箱、紗網、固定材料與箱內環境"],
  ["親子工具安全分工", "成人與孩子分工操作，讓 DIY 安全又有真實參與感"],
  ["步驟 1：開窗與標線", "先畫線，再由成人裁切；保留邊框讓箱體不易變形"],
  ["步驟 2：貼上紗網", "紗網是通風、防逃與保護觀察者的關鍵"],
  ["步驟 3：底部清潔設計", "鋪紙巾、每日檢查，讓幼蟲健康也讓觀察資料更清楚"],
  ["步驟 4：放入寄主植物", "重點不是放很多植物，而是放對蝴蝶會吃的食草"],
  ["步驟 5：安排化蛹空間", "保持安靜與穩定，讓蛹羽化後自然展翅"],
  ["每日照護 SOP", "看狀態、換底紙、補食草、記變化，最後放回自然"],
  ["寄主植物與蜜源植物", "飼養箱是短期觀察；真正的家，是完整棲地"],
  ["觀察紀錄任務", "用階段、食物、行為與問題，讓孩子用證據說話"],
  ["常見問題與處理", "把葉子乾掉、發霉、不吃、蛹掉落變成可改善的科學問題"],
  ["生態倫理：觀察後回到自然", "少量、短期、教育目的觀察，尊重生命與原棲地"],
  ["成果與評量", "作品完成、觀察能力、親子合作與生態態度"],
  ["帶回家的延伸任務", "每天記錄 7–14 天，查找食草與蜜源，設計校園蝴蝶棲地角落"],
  ["臺灣蝴蝶人工飼養與羽化成功指南", "從卵孵化、幼蟲管理、化蛹到安全羽化；校園觀察與培育實務"],
  ["核心觀念", "成功羽化從正確照顧開始：寄主、通風、密度、清潔與垂直空間要同時具備"],
  ["生命史地圖", "卵、幼蟲、蛹與羽化四個階段，各自面對不同風險"],
  ["第一關｜孵化", "卵要連同葉片保留，保持乾爽並每天檢查發霉與腐敗"],
  ["環境控制", "臺灣夏季避免透明盒過熱，放在明亮、無陽光直射且溫差穩定的位置"],
  ["第二關｜成長", "幼蟲只吃牠認得的寄主植物，天然寄主葉片通常比未成熟人工飼料可靠"],
  ["餵食管理", "葉片新鮮，瓶口更要安全；枝條插水並封住瓶口，防止幼蟲落水"],
  ["空間管理", "低密度能切斷疾病傳播；卵、低齡幼蟲與大幼蟲應分開飼養"],
  ["清潔管理", "每天清糞比頻繁噴水重要，並保持箱底乾爽、容器清潔與操作後洗手"],
  ["觀察判讀", "幼蟲不動可能正在蛻皮；不要拉扯絲墊，換葉時連同原葉移動"],
  ["第三關｜化蛹", "終齡幼蟲遊走是在找化蛹點，食草區與化蛹區應分開"],
  ["化蛹關鍵", "前蛹期最需要安靜；固定後避免搬箱、碰觸、震動與強光干擾"],
  ["第四關｜羽化", "蛹下方至少預留成蝶體長 2–3 倍淨空，讓成蝶能完整展翅"],
  ["蛹期照護", "不要靠噴水催羽化；臺灣環境多半偏濕，通風比密封保濕更重要"],
  ["緊急處置", "蛹掉落先處理攀附問題，提供粗糙斜面讓成蝶羽化後向上攀爬"],
  ["羽化後數小時", "剛羽化的翅膀不能碰，安靜等待翅膀伸展、乾燥與硬化"],
  ["完成生命週期", "選擇無雨、風弱、氣溫適宜的白天，在合適棲地附近野放"],
  ["帶回教室的行動清單", "每日五步：辨識、餵食、清潔、分區、等待；降低人為造成的風險"]
].map(([title, caption]) => ({ title, caption }));

const deck = document.querySelector("#presentation-deck");
const player = document.querySelector("#presentation-player");
const playerImage = document.querySelector("#presentation-player-image");
const playerTitle = document.querySelector("#presentation-player-title");
const playerCaption = document.querySelector("#presentation-player-caption");
const playerCount = document.querySelector("#presentation-player-count");
const fullScreenButton = document.querySelector("#presentation-fullscreen");
const closeButton = document.querySelector("#presentation-player-close");
const previousButton = document.querySelector("#presentation-player-prev");
const nextButton = document.querySelector("#presentation-player-next");
const autoplayButton = document.querySelector("#presentation-player-autoplay");
const imagePath = (index) => `assets/presentations/butterfly-box/slide-${String(index + 1).padStart(2, "0")}.png`;
let currentSlide = 0;
let autoplayTimer;

function renderDeck() {
  if (!deck) return;
  deck.innerHTML = slideData.map((slide, index) => `
    <figure class="presentation-slide" id="presentation-slide-${index + 1}">
      <button class="presentation-slide-trigger" type="button" data-slide-index="${index}" aria-label="開啟第 ${index + 1} 張投影片：${slide.title}">
        <img src="${imagePath(index)}" alt="第 ${index + 1} 張投影片：${slide.title}。${slide.caption}" width="1600" height="900" loading="${index < 2 ? "eager" : "lazy"}">
      </button>
      <figcaption><span>${String(index + 1).padStart(2, "0")}</span><div><strong>${slide.title}</strong><small>${slide.caption}</small></div></figcaption>
    </figure>
  `).join("");
  deck.addEventListener("click", (event) => {
    const trigger = event.target.closest("[data-slide-index]");
    if (trigger) openPlayer(Number(trigger.dataset.slideIndex));
  });
}

function updatePlayer() {
  const slide = slideData[currentSlide];
  if (!slide || !playerImage) return;
  playerImage.src = imagePath(currentSlide);
  playerImage.alt = `第 ${currentSlide + 1} 張投影片：${slide.title}。${slide.caption}`;
  playerTitle.textContent = slide.title;
  playerCaption.textContent = slide.caption;
  playerCount.textContent = `${String(currentSlide + 1).padStart(2, "0")} / ${slideData.length}`;
}

function setPlayerExpanded(expanded) {
  player?.classList.toggle("is-expanded", expanded);
  document.body.classList.toggle("presentation-player-open", expanded || Boolean(player?.open));
  if (fullScreenButton) fullScreenButton.setAttribute("aria-pressed", String(expanded || Boolean(player?.open)));
}

function stopAutoplay() {
  window.clearInterval(autoplayTimer);
  autoplayTimer = undefined;
  autoplayButton?.setAttribute("aria-pressed", "false");
  if (autoplayButton) autoplayButton.textContent = "自動播放";
}

function startAutoplay() {
  stopAutoplay();
  autoplayTimer = window.setInterval(() => renderPlayerSlide(currentSlide + 1), 5000);
  autoplayButton?.setAttribute("aria-pressed", "true");
  if (autoplayButton) autoplayButton.textContent = "停止播放";
}

function renderPlayerSlide(index) {
  currentSlide = (index + slideData.length) % slideData.length;
  updatePlayer();
}

async function enterPlayerFullscreen() {
  try {
    if (player?.requestFullscreen) {
      await player.requestFullscreen();
      setPlayerExpanded(true);
      return;
    }
  } catch {
    // The fallback below keeps the player usable when native fullscreen is blocked.
  }
  setPlayerExpanded(true);
}

function openPlayer(index = 0) {
  renderPlayerSlide(index);
  if (player?.showModal) player.showModal();
  else player?.setAttribute("open", "");
  document.body.classList.add("presentation-player-open");
  enterPlayerFullscreen();
}

async function closePlayer() {
  stopAutoplay();
  if (document.fullscreenElement === player) {
    try { await document.exitFullscreen(); } catch { /* keep closing the dialog */ }
  }
  player?.classList.remove("is-expanded");
  document.body.classList.remove("presentation-player-open");
  if (fullScreenButton) fullScreenButton.setAttribute("aria-pressed", "false");
  if (player?.open) player.close();
}

renderDeck();
updatePlayer();
fullScreenButton?.addEventListener("click", () => (player?.open ? closePlayer() : openPlayer()));
closeButton?.addEventListener("click", closePlayer);
previousButton?.addEventListener("click", () => renderPlayerSlide(currentSlide - 1));
nextButton?.addEventListener("click", () => renderPlayerSlide(currentSlide + 1));
autoplayButton?.addEventListener("click", () => (autoplayTimer ? stopAutoplay() : startAutoplay()));
player?.addEventListener("cancel", (event) => { event.preventDefault(); closePlayer(); });
player?.addEventListener("click", (event) => { if (event.target === player) closePlayer(); });
document.addEventListener("fullscreenchange", () => {
  if (document.fullscreenElement !== player && player?.open) setPlayerExpanded(false);
});
document.addEventListener("keydown", (event) => {
  if (!player?.open) return;
  if (event.key === "ArrowRight") { event.preventDefault(); renderPlayerSlide(currentSlide + 1); }
  if (event.key === "ArrowLeft") { event.preventDefault(); renderPlayerSlide(currentSlide - 1); }
  if (event.key === "Home") { event.preventDefault(); renderPlayerSlide(0); }
  if (event.key === "End") { event.preventDefault(); renderPlayerSlide(slideData.length - 1); }
  if (event.key.toLowerCase() === "f") { event.preventDefault(); enterPlayerFullscreen(); }
  if (event.key === " ") { event.preventDefault(); autoplayTimer ? stopAutoplay() : startAutoplay(); }
});
