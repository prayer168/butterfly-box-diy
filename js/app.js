const STORAGE_KEY = "butterfly-box-observation-tasks";
const tasks = [...document.querySelectorAll(".observation-task input[data-task]")];
const progressCount = document.querySelector("#progress-count");
const progressBar = document.querySelector("#progress-bar");

function readCompletedTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return new Set(Array.isArray(saved) ? saved : []);
  } catch {
    return new Set();
  }
}

function saveCompletedTasks(completed) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  } catch {
    // The checklist still works for this visit when storage is unavailable.
  }
}

function updateProgress() {
  const completed = tasks.filter((task) => task.checked).length;
  const total = tasks.length;
  if (progressCount) progressCount.textContent = `${completed} / ${total}`;
  if (progressBar) progressBar.style.width = total ? `${(completed / total) * 100}%` : "0%";
}

const completedTasks = readCompletedTasks();
tasks.forEach((task) => {
  task.checked = completedTasks.has(task.dataset.task);
  task.addEventListener("change", () => {
    const next = new Set(tasks.filter((item) => item.checked).map((item) => item.dataset.task));
    saveCompletedTasks(next);
    updateProgress();
  });
});
updateProgress();

const presentationStage = document.querySelector("#presentation-stage");
const fullscreenButton = document.querySelector("#presentation-fullscreen");

function updateFullscreenState() {
  const isFullscreen = document.fullscreenElement === presentationStage || presentationStage?.classList.contains("is-expanded");
  if (!fullscreenButton) return;
  fullscreenButton.setAttribute("aria-pressed", String(isFullscreen));
  fullscreenButton.innerHTML = isFullscreen ? "退出全螢幕 <span aria-hidden=\"true\">×</span>" : "全螢幕播放 <span aria-hidden=\"true\">⛶</span>";
}

function setPresentationExpanded(expanded) {
  presentationStage?.classList.toggle("is-expanded", expanded);
  document.body.classList.toggle("presentation-expanded", expanded);
  updateFullscreenState();
}

fullscreenButton?.addEventListener("click", async () => {
  if (!presentationStage) return;
  const wasNativeFullscreen = Boolean(document.fullscreenElement);
  try {
    if (wasNativeFullscreen) {
      await document.exitFullscreen();
    } else if (presentationStage.classList.contains("is-expanded")) {
      setPresentationExpanded(false);
      return;
    } else if (presentationStage.requestFullscreen) {
      await presentationStage.requestFullscreen();
    } else {
      setPresentationExpanded(true);
      return;
    }
  } catch {
    setPresentationExpanded(true);
    return;
  }
  if (wasNativeFullscreen) {
    updateFullscreenState();
    return;
  }
  if (!document.fullscreenElement && !presentationStage.classList.contains("is-expanded")) setPresentationExpanded(true);
  updateFullscreenState();
});

document.addEventListener("fullscreenchange", updateFullscreenState);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && presentationStage?.classList.contains("is-expanded")) setPresentationExpanded(false);
});
