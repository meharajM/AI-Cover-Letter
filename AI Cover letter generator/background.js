// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.local.set({randomKey: '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'})
// });

chrome.runtime.onStartup.addListener(function() {
    console.log("welcome");
    
  });
  

function getCoverletter(jobDescription, info, callback) {
    fetch('https://www.careered.ai/api/v1/chat', {
    method: 'POST',
    headers: {
        'authority': 'www.careered.ai',
        'accept': '*/*',
        'accept-language': 'en-IN,en;q=0.6',
        'cache-control': 'no-cache',
        'content-type': 'application/json',
        'cookie': "xcbfbvcbvc",
        'origin': 'https://www.careered.ai',
        'pragma': 'no-cache',
        'referer': 'https://www.careered.ai/tool/cover-letter',
        'sec-ch-ua': '"Chromium";v="118", "Brave";v="118", "Not=A?Brand";v="99"',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '"macOS"',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'same-origin',
        'sec-gpc': '1',
        'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36'
    },
    body: JSON.stringify({
            "type": "cover_letter",
            "data": {
                "jobDescription": jobDescription,
                "info": info,
                "messages": []
            }
    }),
    })
    .then(response => {
        return response.text()
    })
    .then(data => {
        callback({data})
    })
    .catch(function (error) { 
        console.log('Error:', error)
        callback({error})
    });

}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.action === 'getCoverletter') {
            getCoverletter(request.jd, request.info, sendResponse)
            return true;
        }

})