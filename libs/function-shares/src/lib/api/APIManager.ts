import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';
import { apiServer } from './consumer/service';
import { EndPoint } from './EndPoint';
import { Logger } from './Logger';
import { APIEndPoint, Params } from './type';

export const instance = axios.create({});

instance.defaults.timeout = 15000;
const logger = (response: AxiosResponse) => {
  if (response) {
    const data = new Logger(response);
    const curl = data.generateCommand();
    console.log(curl);
  }
};
instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    logger(response);
    return response;
  },
  function (error) {
    logger(error?.response);
    return Promise.reject(error);
  }
);

function APIManager(type: APIEndPoint, params?: any) {
  const getPrefix = () => {
    switch (type) {
      case APIEndPoint.detail_product:
        return EndPoint[type].prefix(params);
      case APIEndPoint.update_address_delivery:
        return EndPoint[type].prefix(params?.id);
      case APIEndPoint.delete_address_delivery:
        return EndPoint[type].prefix(params);
      default:
        return EndPoint[type].prefix();
    }
  };
  const getBaseURL = (): string => {
    switch (type) {
      default:
        return apiServer!;
    }
  };

  const getURL = (): string => {
    switch (type) {
      default:
        return getBaseURL() + getPrefix();
    }
  };

  const getQueryString = () => {
    if (!params) return '';
    let param = '',
      i = 0;

    for (const key in params) {
      if ({}.hasOwnProperty.call(params, key)) {
        const data =
          typeof params[key] === 'object'
            ? JSON.stringify(params[key])
            : params[key];
        param += i !== 0 ? `&${key}=${data}` : `?${key}=${data}`;
        i++;
      }
    }
    return param;
  };

  const getHeader = (): AxiosRequestHeaders => {
    switch (type) {
      default:
        return {
          'Content-Type': 'application/json;charset=UTF-8',
          Accept: 'application/json',
        };
    }
  };

  return {
    getPrefix,
    getBaseURL,
    getHeader,
    getURL,
    params,
  };
}

export const setDefaultToken = (token: string) => {
  instance.defaults.headers.common.Authorization = token;
};

export const setDefaultRegionCode = (code: string) => {
  instance.defaults.headers.common['region-code'] = code;
};

/**
 * example
 * import {APIEndPoint } from '@network/type';
 * APIManager.call(APIEndPoint.login, param?: any)
 * @param type -APIEndPoint
 * @param param - Params
 * @returns  Promise<AxiosResponse<Model>>
 */

const ignoreAPI = [APIEndPoint.detail_product];
const call = <T extends keyof Params>(
  ...arg: undefined extends Params[T]
    ? [type: T, param?: Params[T]]
    : [type: T, param: Params[T]]
) => {
  const type = arg[0];
  const param = arg[1] ? arg[1] : undefined;
  const { getHeader, getURL } = APIManager(type, param);
  switch (EndPoint[type].method) {
    case 'PUT': {
      const config: AxiosRequestConfig = {
        headers: getHeader(),
        timeout: 15000,
      };
      return instance.put(getURL(), param, config);
    }
    case 'POST': {
      const config: AxiosRequestConfig = {
        headers: getHeader(),
        timeout: 15000,
      };
      return instance.post(getURL(), param, config);
    }
    case 'DELETE': {
      const config: AxiosRequestConfig = {
        headers: getHeader(),
        timeout: 15000,
      };
      return instance.delete(getURL(), config);
    }
    case 'GET':
    default: {
      let config: AxiosRequestConfig = {
        headers: getHeader(),
        timeout: 15000,
      };
      if (!ignoreAPI.includes(type)) {
        config = {
          ...config,
          params: param,
        };
      }
      return instance.get(getURL(), config);
    }
  }
};
type DataResponse<T> = {
  res: AxiosResponse<T>;
  success: (res: AxiosResponse<T>) => void;
  error: (res: AxiosResponse<T>) => void;
};
interface IResponse {
  status: { code: number; message: string };
}

const handleResponse = <T extends IResponse>({
  res,
  success,
  error,
}: DataResponse<T>) => {
  if (res.data?.status.code === 200) {
    success(res);
  } else {
    error(res);
  }
};

export { call, handleResponse };
