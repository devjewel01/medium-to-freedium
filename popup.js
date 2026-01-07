const toggle = document.getElementById("toggle");
const statusText = document.getElementById("status-text");

function updateStatus(enabled) {
  if (enabled) {
    statusText.textContent = "Active";
    statusText.classList.remove("off");
    statusText.classList.add("on");
  } else {
    statusText.textContent = "Disabled";
    statusText.classList.remove("on");
    statusText.classList.add("off");
  }
}

chrome.storage.sync.get("enabled", (data) => {
  const isEnabled = data.enabled ?? true;
  toggle.checked = isEnabled;
  updateStatus(isEnabled);
});

toggle.addEventListener("change", () => {
  const isEnabled = toggle.checked;
  chrome.storage.sync.set({ enabled: isEnabled });
  updateStatus(isEnabled);
});
