import { tools } from '@/common/constant';
import storage from '@/common/storage';
import { ContainerType } from '@/interface';
import { Checkbox, Collapse } from 'antd';
import React, { useState } from 'react';

const { Panel } = Collapse;

function SettingsPanel() {
    const [use_current_tab, setUseCurrentTab] = useState<boolean>(
        storage.use_current_tab
    );

    const Components = (props: { key: ContainerType; name: ContainerType }) => {
        switch (props.name) {
            /**
             * cookies
             */
            case ContainerType.cookies:
                return (
                    <Checkbox
                        checked={use_current_tab}
                        onChange={(e) => {
                            storage.use_current_tab = e.target.checked;
                            setUseCurrentTab(e.target.checked);
                        }}
                    >
                        是否默认使用当前页面cookies
                    </Checkbox>
                );
            /**
             * hosts
             */
            case ContainerType.hosts:
                return <p>{ContainerType.hosts}</p>;
            /**
             * storages
             */
            case ContainerType.storages:
                return <p>{ContainerType.storages}</p>;
            default:
                return <></>;
        }
    };

    return (
        <Collapse
            defaultActiveKey={tools.map((t) => {
                return t.key;
            })}
            ghost
        >
            {tools.map((t) => {
                return (
                    <Panel header={<h3>{t.name}</h3>} key={t.key}>
                        <Components key={t.key} name={t.key}></Components>
                    </Panel>
                );
            })}
        </Collapse>
    );
}

export default SettingsPanel;
