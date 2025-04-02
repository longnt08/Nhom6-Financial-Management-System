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
    userId: "67b5ff8e8332ff332b65f6fe",
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
            userId: audit.user_id || "67b5ff8e8332ff332b65f6fe",
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
        userId: formData.userId,
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
    <div className="main-content">
      <h1>{isEditMode ? "Chỉnh sửa kiểm toán" : "Tạo kiểm toán mới"}</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit} className="audit-form">
        <div className="form-group">
          <label htmlFor="title">Tiêu đề:</label>
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
          <label htmlFor="auditType">Loại kiểm toán:</label>
          <select
            id="auditType"
            name="auditType"
            value={formData.auditType}
            onChange={handleChange}
            required
          >
            <option value="RECORD_INFO">Kiểm toán giao dịch</option>
            <option value="CREDIT_AND_DEBIT_MATCHING">Kiểm toán báo cáo</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="auditDate">Ngày kiểm toán:</label>
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
          <label htmlFor="result">Kết quả:</label>
          <select
            id="result"
            name="result"
            value={formData.result}
            onChange={handleChange}
            required
          >
            <option value="ACCEPTED">ACCEPTED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        {auditType === "RECORD_INFO" && (
          <div className="form-group selection-group">
            <label>Chọn giao dịch kiểm toán:</label>
            <div className="checkbox-container">
              {records.map(record => (
                <div key={record.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`record-${record.id}`}
                    checked={formData.recordsId.includes(record.id)}
                    onChange={() => handleCheckboxChange("record", record.id)}
                  />
                  <label htmlFor={`record-${record.id}`}>
                    {record.name} ({record.code})
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        {auditType === "CREDIT_AND_DEBIT_MATCHING" && (
          <div className="form-group selection-group">
            <label>Chọn báo cáo kiểm toán:</label>
            <div className="checkbox-container">
              {reports.map(report => (
                <div key={report.id} className="checkbox-item">
                  <input
                    type="checkbox"
                    id={`report-${report.id}`}
                    checked={formData.reportsId.includes(report.id)}
                    onChange={() => handleCheckboxChange("report", report.id)}
                  />
                  <label htmlFor={`report-${report.id}`}>
                    {report.reportType}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-actions">
          <Link to="/audit" className="button-cancel">Hủy</Link>
          <button type="submit" className="button-submit">
            {isEditMode ? "Cập nhật" : "Tạo mới"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AuditForm;
