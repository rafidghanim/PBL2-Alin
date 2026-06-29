const rangeInput = document.querySelector('input[type="range"]');
const rangeOutput = document.querySelector("output");
const varianceValue = document.querySelector("#varianceValue");
const dropzone = document.querySelector(".dropzone");
const imageInput = document.querySelector("#imageUpload");
const fileName = document.querySelector(".file-name");
const thumb = document.querySelector(".thumb");
const previews = document.querySelectorAll(".image-preview");
const presetButtons = document.querySelectorAll(".preset-group button");
const themeButtons = document.querySelectorAll(".theme-toggle");
const themeLabel = document.querySelector("[data-theme-label]");
const themeIcons = document.querySelectorAll("[data-theme-icon]");
const root = document.documentElement;

if (window.lucide) {
  window.lucide.createIcons();
}

function renderIcons() {
  if (window.lucide) {
    window.lucide.createIcons();
  }
}

function setTheme(isDark) {
  root.classList.toggle("darkmode", isDark);
  localStorage.setItem("theme", isDark ? "dark" : "light");

  if (themeLabel) {
    themeLabel.textContent = isDark ? "Gelap" : "Terang";
  }

  themeIcons.forEach((icon) => {
    icon.setAttribute("data-lucide", isDark ? "moon" : "sun");
  });

  themeButtons.forEach((button) => {
    button.setAttribute("aria-pressed", String(isDark));
  });

  renderIcons();
}

const savedTheme = localStorage.getItem("theme");
const startsDark = savedTheme ? savedTheme === "dark" : root.classList.contains("darkmode");
setTheme(startsDark);

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(!root.classList.contains("darkmode"));
  });
});

function updateVariance(value) {
  const variance = Math.min(98.9, 65 + Number(value) * 0.1823);
  if (rangeOutput) {
    rangeOutput.value = value;
    rangeOutput.textContent = value;
  }
  if (varianceValue) {
    varianceValue.textContent = `${variance.toFixed(2)}%`;
  }
}

if (rangeInput) {
  updateVariance(rangeInput.value);
  rangeInput.addEventListener("input", () => updateVariance(rangeInput.value));
}

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    presetButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
  });
});

function applyImagePreview(file) {
  if (!file) return;

  if (fileName) {
    fileName.textContent = file.name;
  }

  const url = URL.createObjectURL(file);
  if (thumb) {
    thumb.style.backgroundImage = `url("${url}")`;
  }
  previews.forEach((preview) => {
    preview.style.backgroundImage = `url("${url}")`;
  });
}

if (dropzone && imageInput) {
  ["dragenter", "dragover"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.add("drag-over");
    });
  });

  ["dragleave", "drop"].forEach((eventName) => {
    dropzone.addEventListener(eventName, (event) => {
      event.preventDefault();
      dropzone.classList.remove("drag-over");
    });
  });

  dropzone.addEventListener("drop", (event) => {
    const [file] = event.dataTransfer.files;
    applyImagePreview(file);
  });

  imageInput.addEventListener("change", () => {
    const [file] = imageInput.files;
    applyImagePreview(file);
  });
}
