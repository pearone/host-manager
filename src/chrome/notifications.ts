class NotificationsImpl {
    constructor(message: string) {
        const options = {
            type: 'basic' as 'basic',
            iconUrl: '../../icons/128.png',
            title: '结果通知',
            message: message
        };
        chrome.notifications.create('', options, function () {
            console.log('Last error:', chrome.runtime.lastError);
        });
    }
}
