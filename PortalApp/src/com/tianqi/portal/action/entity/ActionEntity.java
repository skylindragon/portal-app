package com.tianqi.portal.action.entity;

import java.util.Map;

public class ActionEntity {
    private String mName;
    private String mImplClass;
    private String mMethod;
    private Map<String, String> mForwardPath;
    
	public String getName() {
		return mName;
	}
	
	public void setName(String mName) {
		this.mName = mName;
	}
	
	public String getImplClass() {
		return mImplClass;
	}
	
	public void setImplClass(String mClass) {
		this.mImplClass = mClass;
	}
	
	public String getMethod() {
		return mMethod;
	}
	
	public void setMethod(String mMethod) {
		this.mMethod = mMethod;
	}
	
	public Map<String, String> getForwardPath() {
		return mForwardPath;
	}
	
	public void setForwardPath(Map<String, String> mForwardPath) {
		this.mForwardPath = mForwardPath;
	}
}
