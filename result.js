chrome.storage.local.get('tosSummary', (data) => {
  const summary = data?.tosSummary || "No summary available.";
  document.getElementById('summary').textContent = summary;

  const riskLevel = assessRiskLevel(summary);
  const riskElement = document.getElementById('risk-level');

  riskElement.textContent = `⚠️ Risk Level: ${riskLevel.label}`;
  riskElement.style.backgroundColor = riskLevel.color;
});

function assessRiskLevel(text) {
  const lowerText = text.toLowerCase();

  if (
    lowerText.includes("waiver of rights") ||
    lowerText.includes("forced arbitration") ||
    lowerText.includes("limitation of liability")
  ) {
    return { label: "High", color: "red" };
  } else if (
    lowerText.includes("data selling") ||
    lowerText.includes("informal resolution")
  ) {
    return { label: "Medium", color: "orange" };
  } else {
    return { label: "Low", color: "green" };
  }
}