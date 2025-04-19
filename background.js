// background.js

const API_KEY = 'YOUR_GOOGLE_CLOUD_API_KEY';

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "translate") {
        const text = request.text;
        const targetLang = request.targetLang;

        fetch(`https://translation.googleapis.com/language/translate/v2?key=${API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                q: text,
                target: targetLang,
                format: 'text'
            })
        })
        .then(response => response.json())
        .then(data => {
            const translatedText = data.data.translations[0].translatedText;
            sendResponse({ translatedText });
        })
        .catch(error => {
            console.error("Error:", error);
            sendResponse({ translatedText: "[Translation failed]" });
        });

        return true; // Keep the message channel open for sendResponse
    }
});
