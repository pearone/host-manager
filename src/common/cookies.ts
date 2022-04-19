/*global chrome*/
class CookiesImpl {
    private isURL(input: string) {
        try {
            return new URL(input);
        } catch {}
        try {
            return new URL('http://' + input);
        } catch {}
        return null;
    }

    /**
     * 获取全量的URL
     * @returns Promise<chrome.cookies.Cookie[]>
     */
    async getCookies() {
        return await chrome.cookies.getAll({});
    }

    /**
     * 获取当前页的URL
     * @returns Promise<chrome.cookies.Cookie[]>
     */
    async getCookiesByCurrentTab() {
        const [tab] = await chrome.tabs.query({
            active: true,
            currentWindow: true
        });

        if (tab?.url) {
            try {
                const url = new URL(tab.url);
                return await chrome.cookies.getAll({ domain: url.hostname });
            } catch {}
        }
        return Promise.resolve([]);
    }

    /**
     * 根据输入的URL获取cookies
     * @param url string
     * @returns Promise<chrome.cookies.Cookie[]>
     */
    async getCookiesByUrl(url: string) {
        const format_url = this.isURL(url);
        if (format_url) {
            return await chrome.cookies.getAll({ url });
        }
        return Promise.resolve([]);
    }

    /**
     *
     */
    setCookies(cookie: chrome.cookies.Cookie, value: string) {
        chrome.cookies.set({
            url: cookie.domain,
            name: cookie.name,
            value: value
        });
    }

    /**
     * 删除某个cookies
     * @param cookie
     * @returns Promise<chrome.cookies.Details>
     */
    async deleteCookie(cookie: chrome.cookies.Cookie) {
        const protocol = cookie.secure ? 'https:' : 'http:';

        const _url = `${protocol}//${cookie.domain}${cookie.path}`;

        return await chrome.cookies.remove({
            url: _url,
            name: cookie.name,
            storeId: cookie.storeId
        });
    }
}

export default CookiesImpl;
