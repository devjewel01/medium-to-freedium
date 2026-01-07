const RULESET_ID = "ruleset_1";

async function syncRuleset() {
  const { enabled } = await chrome.storage.sync.get("enabled");
  const isEnabled = enabled !== false; // default = true

  await chrome.declarativeNetRequest.updateEnabledRulesets({
    enableRulesetIds: isEnabled ? [RULESET_ID] : [],
    disableRulesetIds: isEnabled ? [] : [RULESET_ID]
  });
}

// On install
chrome.runtime.onInstalled.addListener(async () => {
  await chrome.storage.sync.set({ enabled: true });
  await syncRuleset();
});

// On browser startup
chrome.runtime.onStartup.addListener(syncRuleset);

// When toggle changes
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === "sync" && changes.enabled) {
    syncRuleset();
  }
});
