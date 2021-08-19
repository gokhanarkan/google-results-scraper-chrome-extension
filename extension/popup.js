document.addEventListener(
  "DOMContentLoaded",
  () => {
    const checkPageButton = document.getElementById("sendResults");
    checkPageButton.addEventListener(
      "click",
      () => {
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tab = tabs[0];
          // Make sure the extension only sends the Google Page data
          if (!tab.url.startsWith("https://www.google.com/search?q="))
            return alert(
              "This extension can only be used in a Google Search page."
            );
          // Sending the document data to the server
          chrome.tabs.executeScript(tab.id, {
            code: "fetch('http://localhost:3000', { method: 'POST', headers: { 'Content-Type': 'application/json'}, body: JSON.stringify(document)})",
          });
        });
      },
      false
    );
  },
  false
);
