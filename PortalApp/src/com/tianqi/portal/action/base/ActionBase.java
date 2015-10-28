package com.tianqi.portal.action.base;

import java.io.PrintWriter;
import java.sql.Connection;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.tianqi.ds.DataSourceManager;

import net.sf.json.JSONObject;

public class ActionBase implements Action {

	@Override
	public String execute(HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		return null;
	}

	@Override
	public Object invokeBizModel(HttpSession pHttpSession, JSONObject pReqData, String pMethodName, boolean pNeedLink) throws Exception {
        Connection pLink = null;
		
		try {
			if (pNeedLink) {
				String pDSName = (String)pHttpSession.getAttribute("DataSource");
				
				//session里没有数据源，表明是登录
				if (pDSName == null || pDSName.equals("")) {
					pDSName = pReqData.getString("DataSource");
				}
				
				pLink = DataSourceManager.getDefault().getDataSource(pDSName).openConnection();
				pLink.setAutoCommit(false);
			}
			
			Object pRspObj = processBusiness(pLink, pHttpSession, pReqData);
			
			return pRspObj;
		} catch(Exception e) {
			e.printStackTrace();
			if (pLink != null) {
				pLink.rollback();
			}
			
			throw e;
		} finally {
			if (pLink != null) {
				pLink.setAutoCommit(true);
				pLink.close();
			}
		}
	}
	
	public void processResponse(HttpServletRequest req, HttpServletResponse rsp, JSONObject result, String pExtParam) throws Exception {
		PrintWriter pWriter = rsp.getWriter();
		
		try {
			rsp.setContentType("text/json;charset=utf-8");
			pWriter.write(result.toString());
			pWriter.flush();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			pWriter.close();
		}
	}
	
	public Object processBusiness(Connection pLink, HttpSession pSession, JSONObject pReqData) throws Exception {
		return null;
	}
	
	public Object getRequestParam(HttpServletRequest request) throws Exception {
		String pParam = request.getParameter("sendMsg");
        System.out.println("|receive user data:" + pParam);
        return JSONObject.fromObject(pParam);
	}
}
