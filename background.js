'use strict';


chrome.runtime.onMessage.addListener((message, sender) => {
  const tabId = sender.tab.id;
  if (message.method === 'ga-google-opt-report-top') {
    chrome.action.setBadgeText({
      tabId,
      text: message.count.toString()
    });
  }
  else if (message.method === 'ga-google-opt-report-frame') {
    chrome.tabs.sendMessage(tabId, {
      method: 'ga-google-opt-increment'
    });
  }
});

chrome.action.setBadgeBackgroundColor({
  color: '#FC950D'
});



function handleInstalled(details) {
  if (details.reason == 'install') {
      chrome.notifications.create({
        type: "basic",
        iconUrl: "icons/Icon 128.png",
        title: "Thanks for installing",
        message: "Enjoy using our extension!",
      });
  }
}

chrome.runtime.onInstalled.addListener(handleInstalled);
