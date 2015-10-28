package com.tianqi.portal.action.login;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.tianqi.portal.action.base.ActionBase;

import net.sf.json.JSONObject;

public class LoginAction extends ActionBase {

	public String execute(HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		JSONObject pRspObj = new JSONObject();
		
		try {
	        JSONObject pReqData = (JSONObject)super.getRequestParam(req);
			HttpSession pHttpSession = req.getSession(true);
	        pRspObj = (JSONObject)super.invokeBizModel(pHttpSession, pReqData, "", true);
		} catch (Exception e) {
			e.printStackTrace();
			pRspObj.put("RET_CODE", "-1");
			pRspObj.put("RET_MSG", (e.getMessage() == null)?e.getCause().getMessage():e.getMessage());
		}
		
		super.processResponse(req, rsp, pRspObj, null);
		
		return null;
	}
	
	public JSONObject processBusiness(Connection pLink, HttpSession pSession, JSONObject pReqData) throws Exception {
		PreparedStatement pStatement = null;
		ResultSet pUserRS = null;
		
		JSONObject pRspObj = new JSONObject();
		
		try {
			pStatement = pLink.prepareStatement("SELECT USER_ID,USER_NAME,USER_PASS FROM SYS_USER WHERE DISABLE='0' AND USER_ID=?");
		    
			String pUserName = pReqData.getString("UserName");
	        String pUserPass = pReqData.getString("UserPass");
	        
			pStatement.setString(1, pUserName);
			
			pUserRS = pStatement.executeQuery();
			if (pUserRS.next()) {
				if (pUserPass.equals(pUserRS.getString("USER_PASS"))) {
					String pDSName = pReqData.getString("DataSource");
					if (pDSName == null || "".equals(pDSName)) {
						pDSName = "Default";
					}
					
					pSession.setAttribute("DataSource", pDSName);
					pSession.setAttribute("UserId", pUserName);
		        	
		        	pRspObj.put("RET_CODE", "0");
		        	pRspObj.put("RET_MSG", "登录成功");
		        } else {
		        	pRspObj.put("RET_CODE", "1");
		        	pRspObj.put("RET_MSG", "用户名或密码错误");
		        }
			} else {
				pRspObj.put("RET_CODE", "2");
	        	pRspObj.put("RET_MSG", "用户不存在");
			}
		} catch(Exception e) {
			e.printStackTrace();
			pRspObj.put("RET_CODE", "-1");
        	pRspObj.put("RET_MSG", "登录异常：" + ((e.getMessage() == null)?e.getCause().getMessage():e.getMessage()));
		} finally {
			
			if (pUserRS != null) {
				pUserRS.close();
			}
			
			if (pStatement != null) {
				pStatement.close();
			}
		}
		
		return pRspObj;
	}
}
