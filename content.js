(async () => {
  const isProbablyAI = (text) => {
    const aiPhrases = [
      /as an ai language model/i,
      /in conclusion,/i,
      /furthermore,/i,
      /overall,/i,
      /it is important to note/i
    ];
    return aiPhrases.some(rgx => rgx.test(text));
  };

  const scanAndBlur = () => {
    const elements = document.querySelectorAll("p, span, div");
    for (const el of elements) {
      const text = el.innerText;
      if (text && isProbablyAI(text)) {
        el.style.filter = "blur(4px)";
        el.title = "This content may be AI-generated.";
      }
    }
  };

  window.addEventListener("load", scanAndBlur);
  setTimeout(scanAndBlur, 3000);
})();
