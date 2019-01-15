// 配置请求header
const Token = ''; // 获取Token
const DeviceId = '';

enum RequestCache {
    noCache = 'no-cache',
    default = 'default',
    reload = 'reload',
    forceCache = 'force-cache',
    onlyIfCached = 'only-if-cached',
    cache = 'cache',
}

enum RequestMode {
    noCors = 'no-cors',
    sameOrigin = 'same-origin',
    cors = 'cors',
}

export enum RequestMethod {
    put = 'PUT',
    get = 'GET',
    post = 'POST',
    delete = 'DELETE'
}

interface HCfg {
    Accept?: string;
    ContentType?: string;
    Authorization?: string;
    Uuid?: string;
}
export interface Cfg {
    method?:RequestMethod;
    body?: string; 
    cache?: RequestCache;
    mode?: RequestMode;
    credentials?: string;
    headers?: HCfg;
    redirect?: string;
    referrer?: string;
}
export function HeaderConfig(cfg: HCfg = {}) {
    const token = Token ? `Bearer ${Token}` : '';
    const accept = cfg.Accept ? cfg.Accept : 'application/json';
    const contentType = cfg.ContentType ? cfg.ContentType : 'application/json'
    const header = {
        Accept: accept,
        'Content-Type': contentType,
        Authorization: token,
        Uuid: DeviceId,
    };
    return header;
}

export default function FetchConfig(cfg: Cfg = {}) {
    const cfgMode = cfg.mode ? cfg.mode : RequestMode.cors;
    const cfgCache = cfg.cache ? cfg.cache : RequestCache.default;
    const cfgMethod = cfg.method ? cfg.method : RequestMethod.get;
    const config: Cfg = {
        cache: cfgCache, // 'no-cache',  *default, cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *omit
        headers: HeaderConfig(),
        mode: cfgMode, // no-cors, *same-origin, cors
        redirect: 'follow', // *manual, error
        referrer: 'no-referrer', // *client
        method: cfgMethod,
    }
    return config;
}