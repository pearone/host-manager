import storage from '@/common/storage';
import { Checkbox, Collapse } from 'antd';
import React, { useState } from 'react';

const { Panel } = Collapse;

function SettingsPanel() {
    const [use_current_tab, setUseCurrentTab] = useState<boolean>(
        storage.use_current_tab
    );

    return (
        <Collapse defaultActiveKey={['cookies', 'hosts']} ghost>
            <Panel header='Cookies' key='cookies'>
                <Checkbox
                    checked={use_current_tab}
                    onChange={(e) => {
                        storage.use_current_tab = e.target.checked;
                        setUseCurrentTab(e.target.checked);
                    }}
                >
                    是否默认使用当前tab URL
                </Checkbox>
            </Panel>
            <Panel header='Hosts' key='hosts'>
                <p>Hosts</p>
            </Panel>
        </Collapse>
    );
}

export default SettingsPanel;
