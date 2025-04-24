import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import AuditService from "../../services/AuditService.js";
import AccountingService from "../../services/AccountingService.js";

const AuditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = !!id;

  const [formData, setFormData] = useState({
    title: "",
    auditType: "RECORD_INFO",
    auditDate: new Date().toISOString().split('T')[0],
    result: "ACCEPTED",
    recordsId: [],
    reportsId: []
  });

  const [records, setRecords] = useState([]);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(isEditMode);
  const [error, setError] = useState(null);
  const [auditType, setAuditType] = useState("RECORD_INFO");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get available records and reports
        const recordsResponse = await AccountingService.getAllRecord();
        const reportsResponse = await AccountingService.getAllReport();

        setRecords(recordsResponse.data);
        setReports(reportsResponse.data);

        // If editing, get audit details
        if (isEditMode) {
          const audit = await AuditService.getAudit(id);

          setFormData({
            title: audit.title || "",
            auditType: audit.audit_type || "RECORD_INFO",
            auditDate: formatDateForInput(audit.date_audited) || new Date().toISOString().split('T')[0],
            result: audit.result || "ACCEPTED",
            recordsId: audit.records_id || [],
            reportsId: audit.reports_id || []
          });

          setAuditType(audit.audit_type);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Không thể tải dữ liệu");
        setLoading(false);
      }
    };

    fetchData();
  }, [id, isEditMode]);

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });

    if (name === "auditType") {
      setAuditType(value);
    }
  };

  const handleCheckboxChange = (type, itemId) => {
    const field = type === "record" ? "recordsId" : "reportsId";

    if (formData[field].includes(itemId)) {
      setFormData({
        ...formData,
        [field]: formData[field].filter(id => id !== itemId)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...formData[field], itemId]
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Prepare data to match API expectations
      const submitData = {
        title: formData.title,
        userId: localStorage.getItem('id'),
        auditType: formData.auditType,
        auditDate: new Date(formData.auditDate).toISOString(),
        result: formData.result
      };

      // Add either recordsId or reportsId based on audit type
      if (formData.auditType === "RECORD_INFO") {
        submitData.recordsId = formData.recordsId;
      } else if (formData.auditType === "CREDIT_AND_DEBIT_MATCHING") {
        submitData.reportsId = formData.reportsId;
      }

      if (isEditMode) {
        await AuditService.updateAudit({ ...submitData, id });
      } else {
        await AuditService.createAudit(submitData);
      }

      navigate("/audit");
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Không thể lưu dữ liệu");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="auth-container">
      <div className="auth-form">


        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <h2 className="mt-20">{isEditMode ? "Chỉnh sửa kiểm toán" : "Tạo kiểm toán mới"}</h2>
          <div className="form-group">
            <label htmlFor="title">Tiêu đề <span className="required">*</span>:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="auditType">Loại kiểm toán <span className="required">*</span>:</label>
            <select
              id="auditType"
              name="auditType"
              value={formData.auditType}
              onChange={handleChange}
              required
              style={{ padding: '10px', width: '300px', border: 'none', borderRadius: '20px', backgroundColor: '#ddd', textAlign: 'left' }}
            >
              <option value="RECORD_INFO">Kiểm toán giao dịch</option>
              <option value="CREDIT_AND_DEBIT_MATCHING">Kiểm toán báo cáo</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="auditDate">Ngày kiểm toán <span className="required">*</span>:</label>
            <input
              type="date"
              id="auditDate"
              name="auditDate"
              value={formData.auditDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="result">Kết quả <span className="required">*</span>:</label>
            <select
              id="result"
              name="result"
              value={formData.result}
              onChange={handleChange}
              required
              style={{ padding: '10px', width: '300px', border: 'none', borderRadius: '20px', backgroundColor: '#ddd', textAlign: 'left' }}
            >
              <option value="ACCEPTED">ACCEPTED</option>
              <option value="REJECTED">REJECTED</option>
            </select>
          </div>

          {auditType === "RECORD_INFO" && (
            <div className="form-group">
              <label>Chọn giao dịch kiểm toán <span className="required">*</span>:</label>
              <div 
                className="checkbox-container"
                style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '10px',
                  marginTop: '5px'
                }}
              >
                {records.map(record => (
                  <div key={record.id} className="checkbox-item" style={{ margin: '5px 0' }}>
                    <input
                      type="checkbox"
                      id={`record-${record.id}`}
                      checked={formData.recordsId.includes(record.id)}
                      onChange={() => handleCheckboxChange("record", record.id)}
                    />
                    <label htmlFor={`record-${record.id}`} style={{ marginLeft: '5px' }}>
                      {record.name} ({record.code})
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {auditType === "CREDIT_AND_DEBIT_MATCHING" && (
            <div className="form-group">
              <label>Chọn báo cáo kiểm toán <span className="required">*</span>:</label>
              <div 
                className="checkbox-container"
                style={{
                  maxHeight: '200px',
                  overflowY: 'auto',
                  border: '1px solid #ddd',
                  borderRadius: '10px',
                  padding: '10px',
                  marginTop: '5px'
                }}
              >
                {reports.map(report => (
                  <div key={report.id} className="checkbox-item" style={{ margin: '5px 0' }}>
                    <input
                      type="checkbox"
                      id={`report-${report.id}`}
                      checked={formData.reportsId.includes(report.id)}
                      onChange={() => handleCheckboxChange("report", report.id)}
                    />
                    <label htmlFor={`report-${report.id}`} style={{ marginLeft: '5px' }}>
                      {report.reportType}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isEditMode ? "Cập nhật" : "Tạo mới"}
          </button>
        </form>

        <p>
          <a href="#" onClick={() => navigate('/audit')}>Quay lại danh sách</a>
        </p>
      </div>
    </div>
  );
};

export default AuditForm;
