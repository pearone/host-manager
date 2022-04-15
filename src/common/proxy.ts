/*global chrome*/
class HostProxyImpl {
    constructor() {
        const config = {
            mode: 'fixed_servers',
            rules: {
                singleProxy: {
                    host: '10.162.37.160',
                    port: 80
                }
            }
        };

        console.log(chrome);
        console.log('proxy', chrome.proxy);
        // console.log(
        //     chrome,
        //     chrome.proxy.settings.set(
        //         {
        //             value: config,
        //             scope: 'regular'
        //         },
        //         () => {
        //             console.log(`proxy configured with data: 10.162.37.160`);
        //         }
        //     )
        // );
    }
}

export default HostProxyImpl;
