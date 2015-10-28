package com.tianqi.portal.filter;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class LoginFilter implements Filter {

	private static final String T_USER_ID = "UserId";
	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest pReq = (HttpServletRequest) request;
        HttpServletResponse pRsp = (HttpServletResponse) response;
        
        String pUserId = (String)pReq.getSession().getAttribute(T_USER_ID);
        if (pUserId == null || "".equals(pUserId)) {
        	String pReqUri = pReq.getRequestURI();
        	
        	if (LoginPassport.isNeedLogin(pReqUri)) {
        		String pAppName = pReq.getContextPath();
        		pRsp.sendRedirect(pAppName + "/login/login.jsp");
        	} else {
        		filterChain.doFilter(pReq, pRsp);
        	}
        } else {
        	filterChain.doFilter(pReq, pRsp);
        }
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {

	}
}
