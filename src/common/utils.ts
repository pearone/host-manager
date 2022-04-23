import { message } from 'antd';

export const transformMessage = (msg: string) => {
    return chrome.i18n.getMessage(msg);
};

// 显示成功说明
export const showSuccessMessage = (msg = '') => {
    message.success(msg);
};

// 显示警告说明
export const showWarnMessage = (msg = '') => {
    message.warn(msg);
};

// 显示错误说明
export const showErrorMessage = (msg = '') => {
    message.error(msg);
};

// 获取当前页的URL
export const getChromeTabURL = async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true
    });
    if (tab?.url) {
        try {
            const url = new URL(tab.url);
            return url;
        } catch {}
    }
    return undefined;
};

// 隐身模式
export const isIncognitoMode = () => {};
