chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("message", sendResponse);

    if(message.action === "readPageContent"){
        const pageContent = document.body.innerText;
        const prompt = `suggest me a cover letter for this job \n ${pageContent}`
        chrome.runtime.sendMessage({action: 'getCoverletter', jd: prompt, info: pageContent}, (response) => {
            console.log("inside readPageContent listenr", sendResponse)
            sendResponse(response);
        })
        // sendResponse("fake response");
        return true;// Indicate that you will respond asynchronously
    }
});
