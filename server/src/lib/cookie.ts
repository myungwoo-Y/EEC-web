import { CookieOptions, Request, Response } from "express";
import configMap from "../config/config-map";

class CookieUtil {
  private static expiration = 1000 * 60 * 60 * 24 * 365;
  
  static setCookie(key: string, value: string, response: Response, cookieOptions: CookieOptions = {}) {
    response.cookie(key, value, {
      domain: configMap.cookieDomain,
      maxAge: CookieUtil.expiration,
      sameSite: true,
      path: '/',
      secure: false,
      ...cookieOptions
    });
  }

  static getCookie(key: string, request: Request) {
    return request.cookies[key];
  }

}

export default CookieUtil;