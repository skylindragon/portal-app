package com.tianqi.portal.action.login;

import java.sql.Connection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.tianqi.portal.action.base.ActionBase;

import net.sf.json.JSONObject;

public class LogoutAction extends ActionBase {

	public String execute(HttpServletRequest req, HttpServletResponse rsp) throws Exception {
        JSONObject pRspObj = new JSONObject();
		
		try {
			String pParam = req.getParameter("sendMsg");
	        System.out.println("|receive user data:" + pParam);
	        
	        JSONObject pReqData = JSONObject.fromObject(pParam);
			
			HttpSession pHttpSession = req.getSession(true);
			
	        pRspObj = (JSONObject)super.invokeBizModel(pHttpSession, pReqData, "", false);
		} catch (Exception e) {
			e.printStackTrace();
			pRspObj.put("RET_CODE", "-1");
			pRspObj.put("RET_MSG", (e.getMessage() == null)?e.getCause().getMessage():e.getMessage());
		}
		
		super.processResponse(req, rsp, pRspObj, null);
		
		return null;
	}
	
	public JSONObject processBusiness(Connection pLink, HttpSession pSession, JSONObject pReqData) throws Exception {
		JSONObject pRspObj = new JSONObject();
		pSession.invalidate();
		pRspObj.put("RET_CODE", "0");
		pRspObj.put("RET_MSG", "×¢Ïú³É¹¦");
		return pRspObj;
	}
}
