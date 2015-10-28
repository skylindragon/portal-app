package com.tianqi.portal.action.base;

import java.sql.Connection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import net.sf.json.JSONObject;

public interface Action {
    public String execute(HttpServletRequest req, HttpServletResponse rsp) throws Exception;
    public Object invokeBizModel(HttpSession pHttpSession, JSONObject pReqData, String pMethodName, boolean pNeedLink) throws Exception;
    public Object processBusiness(Connection pLink, HttpSession pSession, JSONObject pReqData) throws Exception;
}
