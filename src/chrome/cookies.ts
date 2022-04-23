class CookiesImpl {
    /**
     * 获取全量的cookies
     * @returns Promise<chrome.cookies.Cookie[]>
     */
    async getCookies(domain?: string) {
        return await chrome.cookies.getAll({ domain });
    }

    /**
     * 设置新cookies
     */
    async setCookies(cookie: chrome.cookies.Cookie, value: string) {
        const protocol = cookie.secure ? 'https:' : 'http:';

        // 父域名
        const domain = cookie.domain.startsWith('.')
            ? cookie.domain.slice(1)
            : cookie.domain;

        const _url = `${protocol}//${domain}${cookie.path}`;

        const params: chrome.cookies.SetDetails = {
            domain: cookie.domain,
            url: _url,
            name: cookie.name,
            path: cookie.path,
            value: value
        };

        if (cookie.expirationDate) {
            params.expirationDate = cookie.expirationDate;
        }

        return await chrome.cookies.set(params);
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
