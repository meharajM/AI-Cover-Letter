// chrome.runtime.onInstalled.addListener(() => {
//     chrome.storage.local.set({randomKey: ''})
// });

chrome.runtime.onStartup.addListener(function() {
    chrome.cookies.getAll({ url: 'https://www.careered.ai/tool/cover-letter' }, function(cookies) {
        for(let cookie of cookies) {
            chrome.storage.local.set({cookie: cookie.value})
        }
    });
  });
  

function getCoverletter(jobDescription, info, callback) {
    chrome.storage.local.get(['cookie'], function(result) {
        fetch('https://www.careered.ai/api/v1/chat', {
        method: 'POST',
        headers: {
            'authority': 'www.careered.ai',
            'accept': '*/*',
            'accept-language': 'en-IN,en;q=0.6',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'cookie': result,
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
            callback(data)
        })
        .catch(function (error) { console.log('Error:', error)});

    })
}
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if(request.action === 'getCoverletter') {
            getCoverletter(request.jd, request.info, sendResponse)
            return true;
        }

})