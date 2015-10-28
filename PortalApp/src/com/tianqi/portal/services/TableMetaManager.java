package com.tianqi.portal.services;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;

public class TableMetaManager {
    public static ResultSet getUsedCol(Connection pLink, String pTableName) throws Exception {
    	PreparedStatement pStatement = null;
    	
    	try {
    		String pQuerySql = "SELECT COL_ID,COL_CAPTION,COL_TITLE,DATATYPE,EDITSTYLE,EDITPARAM,WIDTH,DEFAULT,COL_ORDER,ISPKEY,ISNULL,ISUSE,ISVISIBLE FROM SYS_TAB_META WHERE ISUSE=?";
			pStatement = pLink.prepareStatement(pQuerySql);
			pStatement.setString(1, pTableName);
			
			return pStatement.executeQuery();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (pStatement != null) {
				pStatement.close();
			}
		}
    	
    	return null;
    }
}
