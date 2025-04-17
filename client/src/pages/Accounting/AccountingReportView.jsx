import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AccountingService from '../../services/AccountingService'

const AccountingReportView = () => {
  const [report, setReport] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchReport = async () => {
      try {
        setLoading(true)
        const result = await AccountingService.getReport(id)
        setReport(result)
      } catch (err) {
        setError('Không thể tải thông tin báo cáo')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchReport()
    }
  }, [id])

  if (loading) return <div className="loading-message">Đang tải...</div>
  if (error) return <div className="error-message">Lỗi: {error}</div>
  if (!report) return <div className="error-message">Không tìm thấy báo cáo</div>

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date)
  }

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>Báo cáo: {report.reportType}</h1>
        <p className="report-period">Từ: {formatDate(report.startDate)} - Đến: {formatDate(report.endDate)}</p>
      </div>

      <div className="view-content">
        <div className="info-card">
          <div className="report-meta">
            <div className="report-meta-left">
              <p><strong>ID người dùng:</strong> {report.user_id || report.userId}</p>
            </div>
            <div className="report-meta-right">
              <p><strong>Ngày tạo:</strong> {formatDate(report.date_created)}</p>
              <p><strong>ID báo cáo:</strong> {report.id || report._id}</p>
            </div>
          </div>

          <div className="report-table-container">
            <table className="report-table">
              <thead>
                <tr>
                  <th>Danh mục</th>
                  <th>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {report.content && report.content.length > 0 ? (
                  report.content.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.category}</td>
                      <td>{entry.amount}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="2" className="no-data">
                      Không có dữ liệu
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="report-signature">
            <p>Người lập báo cáo: ____________________</p>
            <p>Ngày: ____________________</p>
          </div>
        </div>
      </div>

      <div className="view-footer">
        <Link to="/accounting" className="back-link">Quay lại danh sách</Link>
      </div>
    </div>
  )
}

export default AccountingReportView
