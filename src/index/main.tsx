import React from 'react';
import { createRoot } from 'react-dom/client';
import Container from './container';
import zhCN from 'antd/lib/locale/zh_CN';
import { ConfigProvider } from 'antd';
import '../styles/index.less';

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);

    root.render(
        <React.StrictMode>
            <ConfigProvider locale={zhCN}>
                <Container />
            </ConfigProvider>
        </React.StrictMode>
    );
}
