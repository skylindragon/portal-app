package com.tianqi.portal.action.sys;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import com.tianqi.portal.action.base.ActionBase;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class UserManageAction extends ActionBase {

	public String execute(HttpServletRequest req, HttpServletResponse rsp) throws Exception {
		JSONObject pRspObj = new JSONObject();
		
		try {
	        JSONObject pReqData = (JSONObject)super.getRequestParam(req);
			HttpSession pHttpSession = req.getSession(true);
	        JSONArray pMenuList = (JSONArray)super.invokeBizModel(pHttpSession, pReqData, "", true);
	        pRspObj.put("MENU_LIST", pMenuList);
	        pRspObj.put("RET_CODE", "0");
			pRspObj.put("RET_MSG", "菜单获取成功");
		} catch (Exception e) {
			e.printStackTrace();
			pRspObj.put("RET_CODE", "-1");
			pRspObj.put("RET_MSG", "菜单获取失败" + ((e.getMessage() == null)?e.getCause().getMessage():e.getMessage()));
		}
		
		super.processResponse(req, rsp, pRspObj, null);
		
		return null;
	}
	
	@Override
	public Object processBusiness(Connection pLink, HttpSession pSession, JSONObject pReqData) throws Exception {
		String pParentMenuId = pReqData.getString("parent");
		String pShowAllChildren = pReqData.getString("showAllChild");
		if (pShowAllChildren == null || "".equals(pShowAllChildren)) {
			pShowAllChildren = "0";
		}
		
		JSONArray pMenuList = new JSONArray();
		queryMenuList(pLink, pParentMenuId, pShowAllChildren.equals("1"), pMenuList);
		
		return pMenuList;
	}
	
	private void queryMenuList(Connection pLink, String pParentMenu, boolean pShowAllChild, JSONArray pMenuList) throws Exception {
		PreparedStatement pStatement = null;
		
		ResultSet pMenuRS = null;
		
		try {
			String pQueryMenuSql = "SELECT MENU_ID,MENU_TITLE,MENU_TYPE,URL,ISLEAF,MENU_ICON FROM SYS_MENU WHERE PARENT=? AND DISABLE='0'";
			pStatement = pLink.prepareStatement(pQueryMenuSql);
			
			pStatement.setString(1, pParentMenu);
			pMenuRS = pStatement.executeQuery();
			
			String pCurMenuId = "";
			String pMenuTitle = "";
			String pMenuType = "";
			String pIsLeaf = "0";
			String pLinkUrl = "";
			String pMenuIcon = "";
			JSONObject pCurMenu = null;
			while (pMenuRS.next()) {
				pCurMenu = new JSONObject();
				pCurMenuId = pMenuRS.getString("MENU_ID");
				pMenuTitle = pMenuRS.getString("MENU_TITLE");
				pMenuType = pMenuRS.getString("MENU_TYPE");
				
				pCurMenu.put("MENU_ID", pCurMenuId);
				pCurMenu.put("MENU_TITLE", pMenuTitle);
				pCurMenu.put("MENU_TYPE", pMenuType);
				pCurMenu.put("MENU_PARENT", pParentMenu);
				
				//分隔符，直接处理
				if (pMenuType.equals("1")) {
					pMenuList.add(pCurMenu);
					continue;
				}
				
				pLinkUrl = pMenuRS.getString("URL");
				pIsLeaf = pMenuRS.getString("ISLEAF");
				pMenuIcon = pMenuRS.getString("MENU_ICON");
				pCurMenu.put("LINK_URL", pLinkUrl == null?"":pLinkUrl);
				pCurMenu.put("ISLEAF", pIsLeaf);
				pCurMenu.put("MENU_ICON", pMenuIcon == null?"":pMenuIcon);
				
				pMenuList.add(pCurMenu);
				
				//显示全部子菜单，递归遍历
				if (pShowAllChild) {
					queryMenuList(pLink, pCurMenuId, true, pMenuList);
				}
			}
			
		} catch(Exception e) {
			throw e;
		} finally {
			if (pMenuRS != null) {
				pMenuRS.close();
			}
			
			if (pStatement != null) {
				pStatement.close();
			}
		}
		
	}
}
