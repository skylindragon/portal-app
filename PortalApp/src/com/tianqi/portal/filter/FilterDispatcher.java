package com.tianqi.portal.filter;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Method;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.tianqi.portal.action.ActionManager;
import com.tianqi.portal.action.base.Action;
import com.tianqi.portal.action.entity.ActionEntity;

public class FilterDispatcher implements Filter {

	@Override
	public void destroy() {

	}

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest req = (HttpServletRequest) request;
        HttpServletResponse rsp = (HttpServletResponse) response;
        
        req.setCharacterEncoding("utf-8");
        rsp.setCharacterEncoding("utf-8");
        
        /**
         * 非action直接放行
         */
        String pActionName = getActionName(req, ".do");
        if (pActionName.equals("")) {
        	filterChain.doFilter(request, response);
        	return;
        }
        
        ActionEntity pEntity = ActionManager.getAction(pActionName);
        if (pEntity == null) {
        	System.err.println("action[" + pActionName + "]不存在");
        	return;
        }
        
        String pClassName = pEntity.getImplClass();
        String pMethod = pEntity.getMethod();
        
        Class<?> pActionClass = null;
        Action pAction = null;
        Method pInvokeMethod = null;
        String pForward = null;
        
        try {
			pActionClass = Class.forName(pClassName);
			pAction = (Action)pActionClass.newInstance();
			
			if (pMethod == null || "".equals(pMethod)) {
				pMethod = "execute";
			}
			
			pInvokeMethod = pActionClass.getMethod(pMethod, new Class<?>[] { HttpServletRequest.class, HttpServletResponse.class });
			
			if (pInvokeMethod == null) {
				System.err.println("action[" + pActionName + "]不存在方法" + pMethod + "]");
				return;
			}
			
			pForward = (String)pInvokeMethod.invoke(pAction, new Object[] { req, rsp });
		} catch (Exception e) {
			e.printStackTrace();
		}
        
        /**
         * 跳转页面
         */
        if (pForward != null && !"".equals(pForward)) {
        	String pAppName = req.getContextPath();
        	String pPath = pEntity.getForwardPath().get(pForward);
        	rsp.sendRedirect(pAppName + pPath);
        }
	}

	@Override
	public void init(FilterConfig filterConfig) throws ServletException {
        String pConfigFile = filterConfig.getInitParameter("action_config_file");
        
        InputStream in = null;
        if (pConfigFile != null && "".equals(pConfigFile)) {
        	in = filterConfig.getServletContext().getResourceAsStream(pConfigFile);
        } else {
        	in = FilterDispatcher.class.getResourceAsStream("/action-config.xml");
        }
        
        ActionManager.loadActionConfig(in);
        /**
        InputStream in2 = filterConfig.getServletContext().getResourceAsStream("/WEB-INF/sso_white_list.txt");
	    BufferedReader pReader = new BufferedReader(new InputStreamReader(in2));
	    String pLine = null;
	    try {
			while((pLine = pReader.readLine()) != null) {
				System.out.println(pLine);
			}
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				pReader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}*/
	}
	
	private String getActionName(HttpServletRequest req, String suffix) {
		String pReqUri = req.getRequestURI();
		String pAppName = req.getContextPath();
		String pActionName = pReqUri.substring(pReqUri.indexOf(pAppName) + pAppName.length());
        if (pActionName.endsWith(suffix)) {
        	pActionName = pActionName.substring(0, pActionName.lastIndexOf("."));
        	
        	return pActionName;
        } 
        
        return "";
	}
}
