package com.tianqi.portal.classloader;

public class AppClassLoader extends ClassLoader {
    public AppClassLoader() {
    	super();
    }
    
    @Override
    public Class<?> findClass(String className) throws ClassNotFoundException {
    	Class<?> pClass = super.findClass(className);
    	
    	return pClass;
    }
}
