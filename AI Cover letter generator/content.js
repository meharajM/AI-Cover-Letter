chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("message", sendResponse);

    if(message.action === "readPageContent"){
        const pageContent = document.body.innerText;
       
        chrome.runtime.sendMessage({action: 'getCoverletter', jd: pageContent, info: message.resume}, (response) => {
            console.log("inside readPageContent listenr", sendResponse)
            sendResponse(response);
        })
        // sendResponse("fake response");
        return true;// Indicate that you will respond asynchronously
    }
});
