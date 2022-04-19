import { message } from 'antd';

export const transformMessage = (msg: string) => {
    return chrome.i18n.getMessage(msg);
};

export const isIncognitoMode = () => {};

// 显示成功说明
export const showSuccessMessage = (msg = '') => {
    message.success(msg);
};

// 显示警告说明
export const showWarnMessage = (msg = '') => {
    message.warn(msg);
};

export const showErrorMessage = (msg = '') => {
    message.error(msg);
};
