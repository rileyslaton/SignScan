document.getElementById('scan').addEventListener('click', async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: grabPageText,
    }, async (results) => {
      if (chrome.runtime.lastError) {
        console.error("Error injecting script:", chrome.runtime.lastError.message);
        return;
      }
  
      const pageText = results[0].result;
      console.log("Page text captured:", pageText.substring(0, 500));
  
      const summary = await sendToOpenAI(pageText);
      console.log("Final summary:", summary);
  
      // Save the summary to Chrome storage
      chrome.storage.local.set({ tosSummary: summary }, () => {
        if (chrome.runtime.lastError) {
          console.error("Error saving summary:", chrome.runtime.lastError.message);
        } else {
          console.log("Summary saved successfully.");
          // Wait briefly to ensure it's stored before opening the tab
          setTimeout(() => {
            chrome.tabs.create({ url: chrome.runtime.getURL("result.html") });
          }, 250); // 250ms delay
        }
      });
    });
  });
  
  // Injected into the tab to grab the visible page text
  function grabPageText() {
    return document.body.innerText;
  }
  
  // Calls OpenAI to summarize the TOS
  async function sendToOpenAI(text) {
    const apiKey = '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'; // Replace this with your real key
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a legal expert helping users summarize Terms of Service agreements."
            },
            {
              role: "user",
              content: `Summarize the following Terms of Service and highlight risks like waiving legal rights, forced arbitration, data selling, or limitations of liability:\n\n${text}`
            }
          ],
          temperature: 0.2
        })
      });
  
      const data = await response.json();
      console.log("OpenAI API response:", data);
  
      if (!data.choices || data.choices.length === 0) {
        console.error("No summary returned.");
        return "Error: No summary available.";
      }
  
      return data.choices[0].message.content;
    } catch (error) {
      console.error("Error contacting OpenAI:", error);
      return "Error: Unable to summarize the Terms of Service.";
    }
  }
  
  