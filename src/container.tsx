import { useState } from 'react';
import HostProxy from './common/proxy';
import './container.less';

function Container() {
    const host = new HostProxy();
    console.log(host);

    return <div className={'container'}>aaabbb</div>;
}

export default Container;
