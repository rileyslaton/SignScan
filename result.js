document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('tosSummary', (data) => {
    const summary = data?.tosSummary || "No summary available.";
    const summaryElement = document.getElementById('summary');
    if (summaryElement) {
      summaryElement.textContent = summary;
    } else {
      console.error("Element with ID 'summary' not found.");
    }

    const riskLevel = assessRiskLevel(summary);
    const riskElement = document.getElementById('risk-level');
    if (riskElement) {
      riskElement.textContent = `⚠️ Risk Level: ${riskLevel.label}`;
      riskElement.style.backgroundColor = riskLevel.color;
    } else {
      console.error("Element with ID 'risk-level' not found.");
    }
  });
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
