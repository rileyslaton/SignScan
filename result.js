chrome.storage.local.get('tosSummary', (data) => {
    console.log("Loaded from storage:", data);
    const el = document.getElementById('summary');
    el.textContent = data?.tosSummary || "No summary available.";
  });
  