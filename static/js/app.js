const rangeInput = document.querySelector("[data-k-input]");
const rangeOutput = document.querySelector("output");
const varianceValue = document.querySelector("#varianceValue");
const dropzone = document.querySelector(".dropzone");
const imageInput = document.querySelector("#imageUpload");
const fileName = document.querySelector(".file-name");
const fileDimensions = document.querySelector("[data-file-dimensions]");
const fileSize = document.querySelector("[data-file-size]");
const thumb = document.querySelector(".thumb");
const originalPreview = document.querySelector("[data-original-preview]");
const compressedPreview = document.querySelector("[data-compressed-preview]");
const originalDimensions = document.querySelector("[data-original-dimensions]");
const compressedDimensions = document.querySelector("[data-compressed-dimensions]");
const presetButtons = document.querySelectorAll(".preset-group button");
const themeButtons = document.querySelectorAll(".theme-toggle");
const themeLabel = document.querySelector("[data-theme-label]");
const themeIcons = document.querySelectorAll("[data-theme-icon]");
const compressButton = document.querySelector("[data-compress-button]");
const compressButtonLabel = compressButton?.querySelector("span");
const clearFileButton = document.querySelector("[data-clear-file]");
const formStatus = document.querySelector("[data-form-status]");
const downloadImage = document.querySelector("[data-download-image]");
const downloadData = document.querySelector("[data-download-data]");
const root = document.documentElement;

let selectedFile = null;
let previewUrl = null;

const resultFields = {
  runtime: document.querySelector("[data-runtime]"),
  compressionRatio: document.querySelector("[data-compression-ratio]"),
  originalSize: document.querySelector("[data-original-size]"),
  compressedSize: document.querySelector("[data-compressed-size]"),
  compressionPercentage: document.querySelector("[data-compression-percentage]"),
  infoK: document.querySelector("[data-info-k]"),
  infoOriginalDimensions: document.querySelector("[data-info-original-dimensions]"),
  infoPcaDimensions: document.querySelector("[data-info-pca-dimensions]"),
  infoVariance: document.querySelector("[data-info-variance]"),
  infoColor: document.querySelector("[data-info-color]"),
  chartMarker: document.querySelector("[data-chart-marker]"),
  chartLine: document.querySelector("[data-chart-line]"),
  chartPoint: document.querySelector("[data-chart-point]"),
  downloadSize: document.querySelector("[data-download-size]"),
};

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

function formatBytes(size) {
  const units = ["B", "KB", "MB", "GB"];
  let value = Number(size);

  for (const unit of units) {
    if (value < 1024 || unit === units[units.length - 1]) {
      return unit === "B" ? `${Math.round(value)} B` : `${value.toFixed(1)} ${unit}`;
    }
    value /= 1024;
  }

  return "0 B";
}

function updateVariance(value, actualVariance = null) {
  const variance = actualVariance ?? Math.min(98.9, 65 + Number(value) * 0.1823);
  if (rangeOutput) {
    rangeOutput.value = value;
    rangeOutput.textContent = value;
  }
  if (varianceValue) {
    varianceValue.textContent = `${variance.toFixed(2)}%`;
  }
}

function setStatus(message, type = "muted") {
  if (!formStatus) return;

  formStatus.textContent = message;
  formStatus.dataset.status = type;
}

function setLoading(isLoading) {
  if (!compressButton) return;

  compressButton.disabled = isLoading;
  compressButton.setAttribute("aria-busy", String(isLoading));
  if (compressButtonLabel) {
    compressButtonLabel.textContent = isLoading ? "Memproses..." : "Mulai Kompresi";
  }
}

function setDownloadLink(link, href) {
  if (!link) return;

  if (href) {
    link.href = href;
    link.classList.remove("disabled-link");
    link.removeAttribute("aria-disabled");
  } else {
    link.href = "#";
    link.classList.add("disabled-link");
    link.setAttribute("aria-disabled", "true");
  }
}

function setBackground(element, url) {
  if (!element) return;
  element.style.backgroundImage = url ? `url("${url}")` : "none";
}

function resetFile() {
  selectedFile = null;
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
    previewUrl = null;
  }
  if (imageInput) {
    imageInput.value = "";
  }
  if (fileName) fileName.textContent = "Belum ada file";
  if (fileDimensions) fileDimensions.textContent = "-";
  if (fileSize) fileSize.textContent = "-";
  if (originalDimensions) originalDimensions.textContent = "-";
  if (compressedDimensions) compressedDimensions.textContent = "-";
  setBackground(thumb, null);
  setBackground(originalPreview, null);
  setBackground(compressedPreview, null);
  setDownloadLink(downloadImage, null);
  setDownloadLink(downloadData, null);
  setStatus("");
}

function applyImagePreview(file) {
  if (!file) return;

  selectedFile = file;
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }
  previewUrl = URL.createObjectURL(file);

  if (fileName) fileName.textContent = file.name;
  if (fileSize) fileSize.textContent = formatBytes(file.size);
  setBackground(thumb, previewUrl);
  setBackground(originalPreview, previewUrl);
  setBackground(compressedPreview, null);
  setDownloadLink(downloadImage, null);
  setDownloadLink(downloadData, null);
  setStatus("");

  const image = new Image();
  image.onload = () => {
    const label = `${image.naturalWidth} x ${image.naturalHeight} px`;
    if (fileDimensions) fileDimensions.textContent = label;
    if (originalDimensions) originalDimensions.textContent = label;
  };
  image.src = previewUrl;
}

function renderResult(data) {
  const dimensionLabel = `${data.width} x ${data.height} px`;
  const colorLabel = data.channels === 3 ? "RGB" : "Grayscale";
  const markerLeft = `${Math.max(5, Math.min(95, (data.k / 300) * 100))}%`;
  const pointX = Math.max(0, Math.min(520, (data.k / 300) * 520));
  const pointY = Math.max(10, Math.min(220, 230 - (data.retained_variance / 100) * 220));

  setBackground(compressedPreview, data.image_url);
  if (compressedDimensions) compressedDimensions.textContent = `${dimensionLabel} (rekonstruksi)`;

  resultFields.runtime.textContent = data.runtime_label;
  resultFields.compressionRatio.textContent = data.compression_ratio_label;
  resultFields.originalSize.textContent = data.original_size_label;
  resultFields.compressedSize.textContent = data.compressed_size_label;
  resultFields.compressionPercentage.textContent = data.compression_percentage_label;
  resultFields.infoK.textContent = data.k;
  resultFields.infoOriginalDimensions.textContent = `${data.width} x ${data.height} x ${data.channels}`;
  resultFields.infoPcaDimensions.textContent = `${data.height} x ${data.k} x ${data.channels}`;
  resultFields.infoVariance.textContent = data.retained_variance_label;
  resultFields.infoColor.textContent = colorLabel;
  resultFields.chartMarker.innerHTML = `k = ${data.k}<br>${data.retained_variance_label}`;
  resultFields.chartLine.style.left = markerLeft;
  resultFields.chartPoint.setAttribute("cx", pointX);
  resultFields.chartPoint.setAttribute("cy", pointY);
  resultFields.downloadSize.textContent = `(${data.compressed_size_label})`;

  updateVariance(data.k, data.retained_variance);
  setDownloadLink(downloadImage, data.download_url);
  setDownloadLink(downloadData, data.data_url);
  setStatus("Kompresi selesai.", "success");
}

async function compressImage() {
  if (!selectedFile) {
    setStatus("Pilih gambar terlebih dahulu.", "error");
    return;
  }

  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("k", rangeInput?.value ?? "150");

  setLoading(true);
  setStatus("Mengunggah dan memproses gambar...", "muted");

  try {
    const response = await fetch("/api/compress", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || "Kompresi gagal.");
    }

    renderResult(data);
  } catch (error) {
    setStatus(error.message, "error");
  } finally {
    setLoading(false);
  }
}

const savedTheme = localStorage.getItem("theme");
const startsDark = savedTheme ? savedTheme === "dark" : root.classList.contains("darkmode");
setTheme(startsDark);

themeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setTheme(!root.classList.contains("darkmode"));
  });
});

if (rangeInput) {
  updateVariance(rangeInput.value);
  rangeInput.addEventListener("input", () => updateVariance(rangeInput.value));
}

presetButtons.forEach((button) => {
  button.addEventListener("click", () => {
    presetButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    const varianceTarget = Number.parseInt(button.textContent, 10);
    const nextK = Math.round((varianceTarget - 65) / 0.1823);
    if (rangeInput && Number.isFinite(nextK)) {
      rangeInput.value = Math.max(Number(rangeInput.min), Math.min(Number(rangeInput.max), nextK));
      updateVariance(rangeInput.value);
    }
  });
});

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

if (compressButton) {
  compressButton.addEventListener("click", compressImage);
}

if (clearFileButton) {
  clearFileButton.addEventListener("click", resetFile);
}
