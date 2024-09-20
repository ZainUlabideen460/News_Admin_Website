import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { readreport } from '../features/Detailsdata';

const Report = () => {
  const dispatch = useDispatch();
  const { reports, loading, error } = useSelector(state => state.app);

  useEffect(() => {
    dispatch(readreport());
  }, [dispatch]);

  useEffect(() => {
    console.log("Reports:", reports);
  }, [reports]);

  return (
    <div className='categorynn'>
      <h2 className='zz'>Admin Dashboard</h2>
      <div className="app">
        <div className="header">
          <h2>All Reports</h2>
        </div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error}</p>}
        <div>
          <table className="category-table cate">
            <thead>
              <tr>
                <th>Username</th>
                <th>Report Reason</th>
                <th>News Title</th>
              </tr>
            </thead>
            <tbody>
              {reports && reports.length > 0 ? (
                reports.map((report, index) => (
                  <tr key={index}>
                    <td>{report.reportedBy?.name || 'N/A'}</td>
        <td>{report.reason || 'N/A'}</td>
        <td>{report.newsTitle || 'N/A'}</td>
                   
                  </tr>

                ))
              ) : (
                <tr>
                  <td colSpan="3">No reports available.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Report;