package com.tianqi.portal.filter;

public class LoginPassport {

	/**
	 * 是否需要登录
	 * @param url
	 * @return
	 */
	public static boolean isNeedLogin(String url) {
		if (!(url.endsWith("login.jsp") || url.endsWith("login.do"))) {
			return true;
		}
		
		return false;
	}
}
