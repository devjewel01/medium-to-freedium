const RULESET_ID = "ruleset_1";

function syncRuleset() {
  chrome.storage.sync.get("enabled", (data) => {
    const isEnabled = data.enabled !== false; // default = true

    // specific to V3, both Chrome and Firefox 'chrome' namespace support this promise
    chrome.declarativeNetRequest.updateEnabledRulesets({
      enableRulesetIds: isEnabled ? [RULESET_ID] : [],
      disableRulesetIds: isEnabled ? [] : [RULESET_ID]
    }).catch((err) => console.error("Rule update failed:", err));
  });
}

// On install
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ enabled: true }, () => {
    syncRuleset();
  });
});

// On browser startup
chrome.runtime.onStartup.addListener(syncRuleset);

// When toggle changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.enabled) {
    syncRuleset();
  }
});
