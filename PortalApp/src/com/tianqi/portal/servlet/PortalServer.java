package com.tianqi.portal.servlet;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class PortalServer extends HttpServlet {

	private static final long serialVersionUID = 1L;
	
	public void doGet(HttpServletRequest req, HttpServletResponse rsp) throws IOException,ServletException {
		doPost(req, rsp);
	}

	public void doPost(HttpServletRequest req, HttpServletResponse rsp) throws IOException,ServletException {
		String pAppName = req.getContextPath();
    	rsp.sendRedirect(pAppName + "/main.jsp");
	}
}
