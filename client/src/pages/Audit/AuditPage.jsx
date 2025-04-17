import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuditService from "../../services/AuditService.js";

const AuditPage = () => {
  const [audits, setAudits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAudits = async () => {
      try {
        const response = await AuditService.getAllAudit();
        setAudits(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching audit data:", error);
        setError("Failed to load audit data");
        setLoading(false);
      }
    };

    fetchAudits();
  }, []);

  // Function to format dates
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="main-content">
      <h1>Kiểm Toán</h1>

      <div className="container">
        <div className="box">
          <h3>Xác thực kiểm toán</h3>
          <div className="buttons">
            <button onClick={() => setLoading(false)}>Xem</button>
            <button onClick={() => window.location.href="/audit/create"}>Tạo</button>
          </div>
        </div>
      </div>

      {!loading && !error && (
        <div className="table-container">
          <h2>Danh sách kiểm toán</h2>
          <table>
            <thead>
              <tr>
                <th>Tiêu đề</th>
                <th>Loại kiểm toán</th>
                <th>Ngày kiểm toán</th>
                <th>Kết quả</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {audits.length > 0 ? (
                audits.map(audit => (
                  <tr key={audit._id}>
                    <td>{audit.title}</td>
                    <td>{audit.audit_type}</td>
                    <td>{formatDate(audit.date_audited)}</td>
                    <td>
                      <span className={audit.result === "ACCEPTED" ? "status-success" : "status-rejected"}>
                        {audit.result}
                      </span>
                    </td>
                    <td className="actions">
                      <Link to={`/audit/view/${audit._id}`}>Chi tiết</Link></td>
                    <td className="actions">
                      <Link to={`/audit/edit/${audit._id}`}>Chỉnh sửa</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="no-data">Không có dữ liệu kiểm toán</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditPage;
