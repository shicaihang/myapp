import FetchConfig from './config';
import { RequestMethod, HeaderConfig, Cfg } from './config';

export interface V {
    url: string;
    params?: any;
    data?: any;
}

export default class HTTP {
    public static async get(prop: V) {
        let { url } = prop;
        const { params } = prop;
        if (params) {
            const paramsArray: string[] = [];
            // 拼接参数
            Object.keys(params).forEach(key => paramsArray.push(`${key}=${params[key]}`));
            if (url.search(/\?/) === -1) {
                url += `?${paramsArray.join('&')}`;
            } else {
                url += `&${paramsArray.join('&')}`;
            }
        }
        // await + Expression Expression如果是个promise对象 则返回promise resolve的结果
        // try {
        //     const res = await fetch(url, {
        //         method: 'GET',
        //         headers: cfg(),
        //     });
        //     return await res.json();

        // } catch (error) {
        //     console.log('错误', error);
        // }

        const fetchCfg: Cfg = FetchConfig();
        const myCfg = {
            method: RequestMethod.get
        };
        const config = Object.assign({...fetchCfg}, myCfg);
        // 传统写法
        return fetch(url, config).then(response => response.json())
            .then(responseJson => responseJson)
            .catch((error) => {
                console.log(`error = ${error}`);
            });
    }

    public static post(prop: V) {
        const { url, params } = prop;
        const config = { body: JSON.stringify(params) };
        return fetch(url, config).then(response => response.json())
            .then(responseJson => responseJson).catch((error) => {
                console.log(`error = ${error}`);
            });
    }

    public static file(prop: V) {
        const { url } = prop;
        const formdata = new FormData();
        const setting = {
            ContentType: 'multipart/form-data',
        }
        const fetchCfg: Cfg = FetchConfig({headers:setting});
        const myCfg = {
            method: RequestMethod.post,
            headers: HeaderConfig(setting),
            body: formdata,
        };
        const config = Object.assign({...fetchCfg}, myCfg);
        return fetch(url, config).then(response => response.json())
            .then((responseJson) => {
                console.log(responseJson);
                console.log('image uploaded');
                return responseJson;
            })
            .catch((err) => {
                console.log(err);
            });
        // })
    }

    public static put(prop: V) {
        // fetch请求
        const { url, params } = prop;
        return fetch(url, {
            method: RequestMethod.put,
            headers: HeaderConfig(),
            // body: params,
            body: JSON.stringify(params),
        }).then(response => response.json())
            .then(responseJson => responseJson)
            .catch((error) => {
                console.log(`error = ${error}`);
            });
    }

    public static delete(prop: V) {
        // fetch请求
        const { url } = prop;
        return fetch(url, {
            method: RequestMethod.delete,
            headers: HeaderConfig(),
            // body: params,
            // body: JSON.stringify(params),
        }).then(response => response.json())
            .then(responseJson => responseJson)
            .catch((error) => {
                console.log(`error = ${error}`);
            });
    }
}

