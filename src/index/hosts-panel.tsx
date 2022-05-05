import { ManagerContextStore, useManagerContext } from '@/common/context';
import React from 'react';

function CookiesPanel() {
    // const host = new HostProxy();
    // console.log(host);

    // console.log(chrome, chrome.extension);

    const ManagerContext = React.createContext<ManagerContextStore>(
        {} as ManagerContextStore
    );

    const store = useManagerContext();

    return (
        <ManagerContext.Provider value={store}>
            <div></div>
        </ManagerContext.Provider>
    );
}

export default CookiesPanel;
