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
