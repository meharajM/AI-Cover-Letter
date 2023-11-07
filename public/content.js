chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("message", message);
    if(message.action === "readPageContent"){
        const pageContent = document.body.innerText;
        console.log("page content", pageContent);
        sendResponse(pageContent);
    }
});
