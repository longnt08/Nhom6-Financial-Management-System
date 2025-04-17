import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import AccountingService from '../../services/AccountingService'

const AccountingRecordView = () => {
  const [record, setRecord] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { id } = useParams()

  useEffect(() => {
    const fetchRecord = async () => {
      try {
        setLoading(true)
        const result = await AccountingService.getRecord(id)
        setRecord(result.data)
      } catch (err) {
        setError('Không thể tải thông tin giao dịch')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchRecord()
    }
  }, [id])

  if (loading) return <div className="loading-message">Đang tải...</div>
  if (error) return <div className="error-message">Lỗi: {error}</div>
  if (!record) return <div className="error-message">Không tìm thấy giao dịch</div>

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <div className="view-container">
      <div className="view-header">
        <h1>Giao dịch: {record.name}</h1>
        <p>ID: {record.id || record._id}</p>
      </div>

      <div className="view-content">
        <div className="view-field">
          <strong>Ngày giao dịch:</strong> {formatDate(record.date)}
        </div>
        <div className="view-field">
          <strong>Mã giao dịch:</strong> {record.code}
        </div>
        <div className="view-field">
          <strong>Mô tả:</strong> {record.description}
        </div>
        <div className="view-field">
          <strong>Số tiền nợ:</strong> {record.debit?.toLocaleString('vi-VN')} VND
        </div>
        <div className="view-field">
          <strong>Số tiền có:</strong> {record.credit?.toLocaleString('vi-VN')} VND
        </div>
        <div className="view-field">
          <strong>Loại giao dịch:</strong> {record.category?.name}
        </div>
        <div className="view-field">
          <strong>ID người tạo:</strong> {record.user_id}
        </div>
      </div>

      <div className="view-footer">
        <Link to="/accounting" className="back-link">Quay lại danh sách</Link>
      </div>
    </div>
  )
}

export default AccountingRecordView
