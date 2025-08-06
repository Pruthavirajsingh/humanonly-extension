# HumanOnly – Browser Extension to Detect AI-Generated Content

HumanOnly is a Chrome extension designed for AI-fatigued users – journalists, researchers, and creators – who want to filter or flag AI-generated content while browsing.

## 🚀 Features
- **Blur Detection**: Identifies likely AI-written text using natural-language patterns.
- **Content Scanner**: Scans `<p>`, `<div>`, and `<span>` tags in the DOM.
- **Popup Trigger**: Manual rescan button for edge cases.
- **Lightweight**: No server or database – entirely browser-side.

## 📦 Project Structure
```
humanonly-extension/
├── icon16.png
├── icon48.png
├── icon128.png
├── manifest.json
├── background.js
├── content.js
├── style.css
└── popup.html

```

## 🧠 How It Works
The extension uses pattern-matching on phrases commonly found in LLM-generated text (e.g., "As an AI language model", "In conclusion"). If detected, the text is blurred, and a tooltip is added.

## 🛠️ Installation (Unpacked Extension)
1. Clone the repo:
   ```bash
   git clone https://github.com/yourusername/humanonly-extension.git
   ```
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer Mode**
4. Click **Load Unpacked** and select the project folder
5. Visit any site to see it in action

## 🌐 Optional: View Extension UI on Vercel
You can host just the UI component (popup.html) via Vercel:
```bash
vercel --name humanonly-ui
```
Make sure `popup.html` is in your root directory or a `public/` folder.

## 📋 License
MIT – built by Pruthavirajsingh. Contributions welcome!

