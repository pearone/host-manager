import React from 'react';
import { createRoot } from 'react-dom/client';
import zhCN from 'antd/lib/locale/zh_CN';
import { SettingOutlined } from '@ant-design/icons';
import { ConfigProvider } from 'antd';
import SettingsPanel from './settings';
import '../styles/index.less';

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);

    root.render(
        <React.StrictMode>
            <ConfigProvider locale={zhCN}>
                <div
                    style={{
                        backgroundImage:
                            'linear-gradient(141deg,#009e6c 0,#00d1b2 71%,#00e7eb 100%)',
                        display: 'flex',
                        padding: '3rem 1.5rem'
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <h1 style={{ color: '#fff', margin: 0 }}>
                            Host manager <SettingOutlined />
                        </h1>
                    </div>
                </div>
                <div style={{ padding: '1.5rem' }}>
                    <SettingsPanel />
                </div>
            </ConfigProvider>
        </React.StrictMode>
    );
}
