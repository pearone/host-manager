import { useState } from 'react';
import HostProxy from './common/proxy';
import './App.css';

function App() {
    const host = new HostProxy();
    console.log(host);

    return <div>aaa</div>;
}

export default App;
