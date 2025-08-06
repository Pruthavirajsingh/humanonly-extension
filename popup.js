document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.getElementById("toggle");
  const rescanBtn = document.getElementById("rescan");

  // Load toggle state from storage
  chrome.storage.sync.get(["enabled"], (data) => {
    toggle.checked = data.enabled !== false; // default ON
  });

  // Toggle event
  toggle.addEventListener("change", () => {
    chrome.storage.sync.set({ enabled: toggle.checked });
  });

  // Rescan button calls content script again
  rescanBtn.addEventListener("click", () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: () => {
          chrome.storage.sync.get(["enabled"], (data) => {
            if (data.enabled !== false) {
              const AI_KEYWORDS = [
                "as an AI", "language model", "ChatGPT", "OpenAI",
                "I cannot provide", "AI-generated", "I don't have opinions",
                "I don’t possess consciousness", "AI tools", "as an assistant"
              ];
              const AI_REGEXES = [
                /as an ai language model/i,
                /in conclusion,/i,
                /furthermore,/i,
                /overall,/i,
                /it is important to note/i
              ];
              const isProbablyAI = (text) => {
                const lower = text.toLowerCase();
                return (
                  AI_KEYWORDS.some(k => lower.includes(k.toLowerCase())) ||
                  AI_REGEXES.some(r => r.test(lower))
                );
              };

              const elements = document.querySelectorAll("p, span, div");
              for (const el of elements) {
                const text = el.innerText;
                if (text && isProbablyAI(text) && !el.classList.contains("ai-detected-text")) {
                  el.classList.add("ai-detected-text");
                  el.style.filter = "blur(4px)";
                  el.title = "This content may be AI-generated.";
                  const tag = document.createElement('span');
                  tag.textContent = "⚠️ AI?";
                  tag.style.cssText = `
                    background: white;
                    color: red;
                    font-size: 10px;
                    border: 1px solid red;
                    padding: 1px 3px;
                    margin-left: 5px;
                    border-radius: 3px;
                  `;
                  el.appendChild(tag);
                }
              }
            }
          });
        }
      });
    });
  });
});

