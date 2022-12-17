// connects to button in popup.html
console.log("hello from popup.js")
console.log(window.location.href)//do this only when the button loads
window.addEventListener('load', function() {
    document.getElementById('button').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var currentTab = tabs[0];
            console.log(currentTab)
            chrome.tabs.create({url: "http://localhost:3000/chat?url=" + encodeURIComponent(currentTab['url'])});
        });
    });
});