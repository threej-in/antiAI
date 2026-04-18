const STORAGE_KEYS = {
  enabled: "antiAIEnabled",
  mode: "antiAIMode",
  sensitivity: "antiAISensitivity",
  hideAiOverview: "antiAIHideAiOverview",
  stats: "antiAIStats"
};

const KO_FI_URL = "https://ko-fi.com/threej";
const BITCOIN_ADDRESS = "bc1qmc4n2e7w22n87x5duxurgafc65nfp8fsalfwpu";

const DEFAULT_SETTINGS = {
  antiAIEnabled: true,
  antiAIMode: "remove",
  antiAISensitivity: "normal",
  antiAIHideAiOverview: true
};

const enabledInput = document.getElementById("enabled");
const modeSelect = document.getElementById("mode");
const sensitivitySelect = document.getElementById("sensitivity");
const hideAiOverviewInput = document.getElementById("hideAiOverview");
const statsValue = document.getElementById("statsValue");
const donateLink = document.getElementById("donateLink");
const btcAddressText = document.getElementById("btcAddressText");
const copyBtcButton = document.getElementById("copyBtcButton");

if (donateLink) {
  donateLink.href = KO_FI_URL;
}

if (btcAddressText) {
  btcAddressText.textContent = BITCOIN_ADDRESS;
}

async function copyBitcoinAddress() {
  if (!copyBtcButton) return;

  try {
    await navigator.clipboard.writeText(BITCOIN_ADDRESS);
    copyBtcButton.textContent = "Copied";
    window.setTimeout(() => {
      copyBtcButton.textContent = "Copy BTC";
    }, 1400);
  } catch {
    copyBtcButton.textContent = "Copy failed";
    window.setTimeout(() => {
      copyBtcButton.textContent = "Copy BTC";
    }, 1600);
  }
}

function setStatsText(stats) {
  if (!stats || !stats.hostname) {
    statsValue.textContent = "No scan yet";
    return;
  }

  const verb = stats.mode === "blur" ? "blurred" : "removed";
  statsValue.textContent = `${stats.hidden} posts ${verb} on ${stats.hostname}`;
}

function saveSettings() {
  chrome.storage.sync.set({
    [STORAGE_KEYS.enabled]: enabledInput.checked,
    [STORAGE_KEYS.mode]: modeSelect.value,
    [STORAGE_KEYS.sensitivity]: sensitivitySelect.value,
    [STORAGE_KEYS.hideAiOverview]: hideAiOverviewInput.checked
  });
}

chrome.storage.sync.get(DEFAULT_SETTINGS, (items) => {
  enabledInput.checked = Boolean(items[STORAGE_KEYS.enabled]);
  modeSelect.value = items[STORAGE_KEYS.mode] === "blur" ? "blur" : "remove";
  sensitivitySelect.value = items[STORAGE_KEYS.sensitivity] === "strict" ? "strict" : "normal";
  hideAiOverviewInput.checked = Boolean(items[STORAGE_KEYS.hideAiOverview]);
});

chrome.storage.local.get(STORAGE_KEYS.stats, (items) => {
  setStatsText(items[STORAGE_KEYS.stats]);
});

chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "local" && changes[STORAGE_KEYS.stats]) {
    setStatsText(changes[STORAGE_KEYS.stats].newValue);
    return;
  }

  if (area !== "sync") return;
  if (changes[STORAGE_KEYS.enabled]) {
    enabledInput.checked = Boolean(changes[STORAGE_KEYS.enabled].newValue);
  }
  if (changes[STORAGE_KEYS.mode]) {
    modeSelect.value = changes[STORAGE_KEYS.mode].newValue === "blur" ? "blur" : "remove";
  }
  if (changes[STORAGE_KEYS.sensitivity]) {
    sensitivitySelect.value =
      changes[STORAGE_KEYS.sensitivity].newValue === "strict" ? "strict" : "normal";
  }
  if (changes[STORAGE_KEYS.hideAiOverview]) {
    hideAiOverviewInput.checked = Boolean(changes[STORAGE_KEYS.hideAiOverview].newValue);
  }
});

enabledInput.addEventListener("change", saveSettings);
modeSelect.addEventListener("change", saveSettings);
sensitivitySelect.addEventListener("change", saveSettings);
hideAiOverviewInput.addEventListener("change", saveSettings);
if (copyBtcButton) {
  copyBtcButton.addEventListener("click", copyBitcoinAddress);
}
