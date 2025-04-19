// content.js

let targetLang = 'es';  // Default language set to Spanish

const overlay = document.createElement('div');
overlay.id = 'translated-subtitles-overlay';
document.body.appendChild(overlay);

overlay.style.position = 'fixed';
overlay.style.bottom = '50px';
overlay.style.width = '100%';
overlay.style.textAlign = 'center';
overlay.style.fontSize = '20px';
overlay.style.color = 'white';
overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
overlay.style.padding = '10px';
overlay.style.zIndex = '1000';

// Function to display translated subtitles
function displayTranslatedSubtitle(text) {
    overlay.innerText = text;
}

// Fetch original subtitles
function fetchSubtitles() {
    const captions = document.querySelectorAll(".ytp-caption-segment");

    if (captions.length > 0) {
        const text = Array.from(captions).map(c => c.innerText).join(' ');

        chrome.runtime.sendMessage(
            { action: "translate", text, targetLang },
            (response) => {
                if (response.translatedText) {
                    displayTranslatedSubtitle(response.translatedText);
                }
            }
        );
    }
}

// Poll subtitles periodically
setInterval(fetchSubtitles, 1000);

// Listen for messages from popup
chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'setLanguage') {
        targetLang = request.targetLang;
    }
});
