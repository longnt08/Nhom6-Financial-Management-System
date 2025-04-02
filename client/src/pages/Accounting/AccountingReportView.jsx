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

  if (loading) return <div>Đang tải...</div>
  if (error) return <div>Lỗi: {error}</div>
  if (!report) return <div>Không tìm thấy báo cáo</div>

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
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>{report.reportType}</h1>
        <p>Từ: {formatDate(report.startDate)} - Đến: {formatDate(report.endDate)}</p>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <p><strong>ID người dùng:</strong> {report.user_id || report.userId}</p>
        </div>
        <div>
          <p><strong>Ngày tạo:</strong> {formatDate(report.date_created)}</p>
          <p><strong>ID báo cáo:</strong> {report.id || report._id}</p>
        </div>
      </div>

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Danh mục</th>
            <th style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'left' }}>Thành tiền</th>
          </tr>
        </thead>
        <tbody>
          {report.content && report.content.length > 0 ? (
            report.content.map((entry, index) => (
              <tr key={index}>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.category}</td>
                <td style={{ border: '1px solid #ddd', padding: '8px' }}>{entry.amount}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <p>Người lập báo cáo: ____________________</p>
        <p>Ngày: ____________________</p>
      </div>

      <Link to="/accounting/report">Quay lại danh sách báo cáo</Link>
    </div>
  )
}

export default AccountingReportView
