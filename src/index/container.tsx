import React, { useState } from 'react';
import { Tabs } from 'antd';
import CookiesPanel from './cookies-panel';
import HostsPanel from './hosts-panel';
import StoragesPanel from './storages-panel';
import { SettingOutlined } from '@ant-design/icons';
import { ContainerType } from '../interface';
import { tools } from '../common/constant';
import '../styles/index.less';

const { TabPane } = Tabs;

const Components = (props: { key: ContainerType; name: ContainerType }) => {
    switch (props.name) {
        case ContainerType.hosts:
            return <HostsPanel />;
        case ContainerType.storages:
            return <StoragesPanel />;
        case ContainerType.cookies:
            return <CookiesPanel />;
        default:
            return <></>;
    }
};

function Container() {
    const [active_key, setActiveKey] = useState<ContainerType>(
        ContainerType.cookies
    );
    return (
        <div className={'container'}>
            <Tabs
                animated={{ inkBar: false, tabPane: false }}
                activeKey={active_key}
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
                onChange={(active_key: ContainerType & 'settings') => {
                    if (active_key === 'settings') {
                        window.open('options.html');
                    } else {
                        setActiveKey(active_key);
                    }
                }}
            >
                {tools.map((t) => {
                    return (
                        <TabPane
                            tab={t.name}
                            key={t.key}
                            style={{ height: '100%', overflow: 'hidden' }}
                        >
                            <Components key={t.key} name={t.key}></Components>
                        </TabPane>
                    );
                })}
                <TabPane tab={<SettingOutlined />} key='settings'></TabPane>
            </Tabs>
        </div>
    );
}

export default Container;
