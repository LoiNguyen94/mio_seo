import {AxiosRequestConfig, AxiosResponse} from 'axios';
export class Logger {
  request: AxiosRequestConfig<unknown>;
  constructor(config: AxiosResponse) {
    this.request = config.config;
  }

  getHeaders() {
    const headers = this.request.headers
    let curlHeaders = '';

    for (const property in headers) {
      if ({}.hasOwnProperty.call(headers, property)) {
        const header = `${property}:${headers[property]}`;
        curlHeaders = `${curlHeaders} -H "${header}"`;
      }
    }

    return curlHeaders.trim();
  }

  getMethod() {
    return `-X ${this.request.method?.toUpperCase()}`;
  }

  getBody() {
    if (
      typeof this.request.data !== 'undefined' &&
      this.request.data !== '' &&
      this.request.data !== null &&
      this.request.method?.toUpperCase() !== 'GET'
    ) {
      const data =
        typeof this.request.data === 'object' ||
        Object.prototype.toString.call(this.request.data) === '[object Array]'
          ? JSON.stringify(this.request.data)
          : this.request.data;
      return `--data '${data}'`.trim();
    } else {
      return '';
    }
  }

  getUrl() {
    if (this.request.baseURL) {
      return this.request.baseURL + '/' + this.request.url;
    }
    return this.request.url;
  }

  getQueryString() {
    let params = '',
      i = 0;

    for (const param in this.request.params) {
      if ({}.hasOwnProperty.call(this.request.params, param)) {
        const data =
          typeof this.request.params[param] === 'object'
            ? JSON.stringify(this.request.params[param])
            : this.request.params[param];
        params += i !== 0 ? `&${param}=${data}` : `?${param}=${data}`;
        i++;
      }
    }

    return params;
  }

  getBuiltURL() {
    let url = this.getUrl();

    if (this.getQueryString() !== '') {
      url =
        url?.charAt(url.length - 1) === '/'
          ? url.substring(0, url.length - 1)
          : url;
      url += this.getQueryString().toString();
    }

    return url?.trim();
  }

  generateCommand() {
    return `curl ${this.getMethod()} ${this.getHeaders()} ${this.getBody()} '${this.getBuiltURL()}'`
      .trim()
      .replace(/\s{2,}/g, ' ');
  }
}
