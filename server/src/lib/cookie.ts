import { CookieOptions, Request, Response } from "express";
import configMap from "../config/config-map";

class CookieUtil {
  private static expiration = 1000 * 60 * 60 * 24 * 365;

  private static defaultCookieOption: Partial<CookieOptions> = {
    domain: configMap.cookieDomain,
    maxAge: CookieUtil.expiration,
    sameSite: true,
    path: '/',
  };

  static setCookie(key: string, value: string, response: Response, cookieOptions: CookieOptions = {}) {
    response.cookie(key, value, {
      ...CookieUtil.defaultCookieOption,
      ...cookieOptions
    });
  }

  static getCookie(key: string, request: Request) {
    return request.cookies[key];
  }

  static clearCookie(key: string, response: Response) {
    return response.clearCookie(key, CookieUtil.defaultCookieOption);
  }

}

export default CookieUtil;