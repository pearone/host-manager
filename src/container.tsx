import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import CookiesPanel from './component/cookies-panel';
import HostsPanel from './component/hosts-panel';
import SettingsPanel from './component/settings-panel';
import StoragesPanel from './component/storages-panel';
import { SettingOutlined } from '@ant-design/icons';
import './styles/index.less';
import { ContainerType } from './interface';
import { tools } from './common/constant';

const { TabPane } = Tabs;

const Components = (props: { key: ContainerType; name: ContainerType }) => {
    switch (props.name) {
        case ContainerType.cookies:
            return <CookiesPanel />;
        case ContainerType.hosts:
            return <HostsPanel />;
        case ContainerType.storages:
            return <StoragesPanel />;
        default:
            return <></>;
    }
};

function Container() {
    return (
        <div className={'container'}>
            <Tabs
                defaultActiveKey='cookies'
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
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
                <TabPane tab={<SettingOutlined />} key='setting'>
                    <SettingsPanel></SettingsPanel>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Container;
