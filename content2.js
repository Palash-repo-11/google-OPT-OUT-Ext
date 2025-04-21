let port;
try {
    port = document.getElementById('ga-google-opt-port');
    if (!port) {
        port = document.createElement('span');
        port.id = 'ga-google-opt-port';
        document.documentElement.append(port);
    }
}
catch (e) {
    console.log(e)
}
let count = 0;

port.addEventListener('ga-google-opt-event', function (e) {
    count++
    e.preventDefault();
    e.stopPropagation();
    if (window.top === window) {
        chrome.runtime.sendMessage({
            method: 'ga-google-opt-report-top',
            count
        });
    }
    else {
        chrome.runtime.sendMessage({
            method: 'ga-google-opt-report-frame'
        });
    }
});


if (window.top === window) {
    chrome.runtime.onMessage.addListener((message, sender, sendResponce) => {
        if (message.method === 'ga-google-opt-increment') {
            count += 1;
            chrome.runtime.sendMessage({
                method: 'ga-google-opt-report-top',
                count
            });
        }
    });
}
