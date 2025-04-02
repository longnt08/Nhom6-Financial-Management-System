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

  if (loading) return <div>Đang tải...</div>
  if (error) return <div>Lỗi: {error}</div>
  if (!record) return <div>Không tìm thấy giao dịch</div>

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
    <div>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <h1>Giao dịch: {record.name}</h1>
        <p>ID: {record.id || record._id}</p>
      </div>

      <div>
        <p><strong>Ngày giao dịch:</strong> {formatDate(record.date)}</p>
        <p><strong>Mã giao dịch:</strong> {record.code}</p>
        <p><strong>Mô tả:</strong> {record.description}</p>
        <p><strong>Số tiền nợ:</strong> {record.debit}</p>
        <p><strong>Số tiền có:</strong> {record.credit}</p>
        <p><strong>Loại giao dịch:</strong> {record.category?.name}</p>
        <p><strong>ID người tạo:</strong> {record.user_id}</p>
      </div>

      <Link to="/accounting/record">Quay lại danh sách</Link>
    </div>
  )
}

export default AccountingRecordView
