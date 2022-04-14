/*global chrome*/
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ManagerContextStore, useManagerContext } from './common/context';
import Container from './container';
import './index.css';

const ManagerContext = React.createContext<ManagerContextStore>(
    {} as ManagerContextStore
);

const store = useManagerContext();

const container = document.getElementById('root');

if (container) {
    const root = createRoot(container);

    root.render(
        <React.StrictMode>
            <ManagerContext.Provider value={store}>
                <Container />
            </ManagerContext.Provider>
        </React.StrictMode>
    );
}
