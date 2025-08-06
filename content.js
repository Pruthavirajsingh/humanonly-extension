(async () => {
  const AI_REGEXES = [
    /as an ai language model/i,
    /in conclusion,/i,
    /furthermore,/i,
    /overall,/i,
    /it is important to note/i
  ];

  const AI_KEYWORDS = [
    "as an AI", "language model", "ChatGPT", "OpenAI", 
    "I cannot provide", "AI-generated", "I don't have opinions", 
    "I don’t possess consciousness", "AI tools", "as an assistant"
  ];

  const isProbablyAI = (text) => {
    const lowerText = text.toLowerCase();
    return (
      AI_REGEXES.some(rgx => rgx.test(lowerText)) ||
      AI_KEYWORDS.some(keyword => lowerText.includes(keyword.toLowerCase()))
    );
  };

  const scanAndHandleAIContent = () => {
    const elements = document.querySelectorAll("p, span, div");
    for (const el of elements) {
      const text = el.innerText;
      if (text && isProbablyAI(text)) {
        // Avoid double tagging
        if (!el.classList.contains("ai-detected-text")) {
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
  };

  // Only run if extension is enabled
  chrome.storage.sync.get(["enabled"], (data) => {
    if (data.enabled !== false) {
      window.addEventListener("load", scanAndHandleAIContent);
      setTimeout(scanAndHandleAIContent, 3000);
    }
  });
})();
