import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import AuditService from "../../services/AuditService.js";

const AuditView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [audit, setAudit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuditDetails = async () => {
      try {
        const response = await AuditService.getAudit(id);
        setAudit(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching audit details:", error);
        setError("Failed to load audit details");
        setLoading(false);
      }
    };

    fetchAuditDetails();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa kiểm toán này?")) {
      try {
        await AuditService.removeAudit(id);
        navigate("/audit");
      } catch (error) {
        console.error("Error deleting audit:", error);
        alert("Không thể xóa kiểm toán");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !audit) {
    return <div className="error">{error || "Không tìm thấy dữ liệu kiểm toán"}</div>;
  }

  return (
    <div className="main-content">
      <h1>Chi tiết kiểm toán</h1>
      
      <div className="actions">
        <Link to="/audit" className="button-back">Quay lại</Link>
        <Link to={`/audit/edit/${id}`} className="button-edit">Chỉnh sửa</Link>
        <button onClick={handleDelete} className="button-delete">Xóa</button>
      </div>

      <div className="audit-details">
        <div className="detail-row">
          <div className="detail-label">Tiêu đề:</div>
          <div className="detail-value">{audit.title}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Loại kiểm toán:</div>
          <div className="detail-value">{audit.audit_type}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Ngày kiểm toán:</div>
          <div className="detail-value">{formatDate(audit.date_audited)}</div>
        </div>
        
        <div className="detail-row">
          <div className="detail-label">Kết quả:</div>
          <div className={`detail-value ${audit.result === "ACCEPTED" ? "status-success" : "status-rejected"}`}>
            {audit.result}
          </div>
        </div>
      </div>

      {audit.records && audit.records.length > 0 && (
        <div className="related-records">
          <h2>Giao dịch kiểm toán</h2>
          <table>
            <thead>
              <tr>
                <th>Ngày GD</th>
                <th>Tên</th>
                <th>Nợ</th>
                <th>Có</th>
                <th>Loại GD</th>
              </tr>
            </thead>
            <tbody>
              {audit.records.map(record => (
                <tr key={record._id}>
                  <td>{formatDate(record.date)}</td>
                  <td>{record.name}</td>
                  <td>{record.debit}</td>
                  <td>{record.credit}</td>
                  <td>{record.category}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {audit.reports && audit.reports.length > 0 && (
        <div className="related-reports">
          <h2>Báo cáo kiểm toán</h2>
          <table>
            <thead>
              <tr>
                <th>Loại báo cáo</th>
                <th>Ngày tạo</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
              </tr>
            </thead>
            <tbody>
              {audit.reports.map(report => (
                <tr key={report._id}>
                  <td>{report.report_type}</td>
                  <td>{formatDate(report.date_created)}</td>
                  <td>{formatDate(report.start_date)}</td>
                  <td>{formatDate(report.end_date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AuditView;
