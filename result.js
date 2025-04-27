document.addEventListener('DOMContentLoaded', () => {
  chrome.storage.local.get('tosSummary', (data) => {
    const summary = data?.tosSummary || "No summary available.";
    const summaryElement = document.getElementById('summary');
    if (summaryElement) {
      summaryElement.innerHTML = simpleMarkdownToHtml(summary);
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
    return { label: "High - 5", color: "red" };
  } else if (
    lowerText.includes("data selling") ||
    lowerText.includes("informal resolution")
  ) {
    return { label: "Medium - 3", color: "orange" };
  } else {
    return { label: "Low - 1", color: "green" };
  }
}

function simpleMarkdownToHtml(text) {  
    return `<div style="font-size:25px">${
        text
          .replace(/^# (.*$)/gm, '<h1 style="font-size:35px">$1</h1>')
          .replace(/^## (.*$)/gm, '<h2 style="font-size:35px">$1</h2>')
          .replace(/^- ### (.*$)/gm, '<h3 style="font-size:35px"><strong><em>$1</em></strong></h3>')
          .replace(/^### (.*$)/gm, '<h3 style="font-size:35px">$1</h3>')
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          .replace(/\n/g, '<br>')
      }</div>`;                       
}
