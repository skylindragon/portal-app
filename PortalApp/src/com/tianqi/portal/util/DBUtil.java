package com.tianqi.portal.util;

import java.sql.Connection;

import com.tianqi.ds.DataSourceManager;
import com.tianqi.ds.interfaces.DataSource;

public class DBUtil {

	public static Connection getConnection(String pDSName) throws Exception {
		DataSource pDataSource = DataSourceManager.getDefault().getDataSource(pDSName);
		
		return (pDataSource == null)? null : pDataSource.openConnection();
	}
}
