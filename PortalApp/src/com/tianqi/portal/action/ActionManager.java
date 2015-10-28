package com.tianqi.portal.action;

import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

import com.tianqi.portal.action.entity.ActionEntity;

public class ActionManager {
    private static Map<String, ActionEntity> mActionManager = new HashMap<String, ActionEntity>();
    
    public static void loadActionConfig(InputStream in) {
    	try {
    		SAXReader pReader = new SAXReader();
    		Document pDocument = pReader.read(in);
    		Element pRootNode = pDocument.getRootElement();
    		Element pActionListEle = pRootNode.element("action-list");
    		List<Element> pActionList = pActionListEle.elements();
    		
    		String                    pActionName         = null;
    		Element                    pActionEle         = null;
    		ActionEntity            pActionEntity         = null;
    		Map<String, String>       pForwardMap         = null; 
    		List<Element>            pForwardList         = null;
    		String                    pForwarName         = null;
    		String                   pForwardPath         = null;
    		
    		for (int i = 0; i < pActionList.size(); i++) {
    			pActionEntity = new ActionEntity();
    			
    			pActionEle = pActionList.get(i);
    			pActionName = pActionEle.attributeValue("name");
    			pActionEntity.setName(pActionName);
    			pActionEntity.setImplClass(pActionEle.attributeValue("class"));
    			pActionEntity.setMethod(pActionEle.attributeValue("method"));
    			
    			pForwardMap = new HashMap<String, String>();
    			pForwardList = pActionEle.elements();
    			for (int j = 0; j < pForwardList.size(); j++) {
    				pForwarName = pForwardList.get(j).attributeValue("name");
    				pForwardPath = pForwardList.get(j).attributeValue("path");
    				
    				pForwardMap.put(pForwarName, pForwardPath);
    			}
    			
    			pActionEntity.setForwardPath(pForwardMap);
    			
    			mActionManager.put(pActionName, pActionEntity);
    			
    			System.out.println("|ActionManager load action [" + pActionName + "]");
    		}
    	} catch(Exception e) {
    		e.printStackTrace();
    	} finally {
    		if (in != null) {
    			try {
					in.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
    		}
    	}
    }
    
    public static void reloadActionConfig(InputStream in) {
    	synchronized (mActionManager) {
    		mActionManager.clear();
        	loadActionConfig(in);
		}
    }
    
    public static ActionEntity getAction(String name) {
    	return mActionManager.get(name);
    }
    
    public static void main(String[] args) {
    	ActionManager.loadActionConfig(ActionManager.class.getResourceAsStream("/action-config.xml"));
    	ActionEntity login = ActionManager.getAction("login");
    	ActionEntity logout = ActionManager.getAction("logout");
    	Map<String, String> pForward = login.getForwardPath();
    	pForward = logout.getForwardPath();
    	System.out.println(login.getImplClass());
    	System.out.println(logout.getImplClass());
    }
}
