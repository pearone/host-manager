import HostProxy from './common/proxy';
import './container.less';

function Container() {
    const host = new HostProxy();
    console.log(host);

    console.log(chrome, chrome.extension);

    return <div className={'container'}>aaabbbccc</div>;
}

export default Container;
