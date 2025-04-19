// popup.js

document.getElementById('save-button').addEventListener('click', () => {
    const selectedLang = document.getElementById('language-select').value;

    // Send the selected language to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'setLanguage', targetLang: selectedLang });
    });

    window.close();
});
