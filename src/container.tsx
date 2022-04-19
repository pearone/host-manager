import React, { useEffect } from 'react';
import { Tabs } from 'antd';
import CookiesPanel from './component/cookies-panel';
import HostsPanel from './component/hosts-panel';
import './styles/index.less';
const { TabPane } = Tabs;

function Container() {
    return (
        <div className={'container'}>
            <Tabs
                defaultActiveKey='cookie'
                style={{ width: '100%', height: '100%', overflow: 'hidden' }}
            >
                <TabPane
                    tab='Cookies'
                    key='cookie'
                    style={{ height: '100%', overflow: 'hidden' }}
                >
                    <CookiesPanel></CookiesPanel>
                </TabPane>
                <TabPane tab='Host' key='host'>
                    <HostsPanel></HostsPanel>
                </TabPane>
            </Tabs>
        </div>
    );
}

export default Container;
