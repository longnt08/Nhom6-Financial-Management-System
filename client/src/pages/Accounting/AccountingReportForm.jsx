import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import AccountingService from '../../services/AccountingService'

const AccountingReportForm = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [error, setError] = useState(null)

  const [report, setReport] = useState({
    user_id: '67b5ff8e8332ff332b65f6fe',
    reportType: '',
    startDate: '',
    endDate: '',
    date_created: new Date().toISOString(),
    content: []
  })

  useEffect(() => {
    if (id) {
      AccountingService.getReport(id)
        .then(data => {
          setReport(data)
        })
        .catch(error => {
          setError('Error loading report: ' + error.message)
        })
    }
  }, [id])

  const handleInputChange = (e) => {
    const {name, value} = e.target
    setReport({
      ...report,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(report)

    const submitReport = {
      ...report,
      startDate: new Date(report.startDate).toISOString(),
      endDate: new Date(report.endDate).toISOString(),
      id: id
    }

    const savePromise = id
      ? AccountingService.updateReport(submitReport)
      : AccountingService.createReport(submitReport)

    savePromise
      .then(() => {
        navigate('/accounting')
      })
      .catch(error => {
        setError('Error saving report: ' + error.message)
      })
  }

  const formatDateForInput = (dateString) => {
    if (!dateString) return ''

    try {
      // Convert ISO string to format suitable for datetime-local input
      return dateString.substring(0, 16)
    } catch (error) {
      console.error("Error formatting date:", error)
      return ''
    }
  }

  return (
    <div>
      <h2>
        {id ? 'Chỉnh sửa báo cáo' : 'Tạo báo cáo mới'}
        {error && <span style={{color: 'red'}}>{error}</span>}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Loại báo cáo:</label>
          <input
            type="text"
            name="reportType"
            value={report.reportType}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ngày bắt đầu:</label>
          <input
            type="datetime-local"
            name="startDate"
            value={formatDateForInput(report.startDate)}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ngày kết thúc:</label>
          <input
            type="datetime-local"
            name="endDate"
            value={formatDateForInput(report.endDate)}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Lưu báo cáo</button>
      </form>

      <button onClick={() => navigate('/accounting')}>Quay lại danh sách</button>
    </div>
  )
}

export default AccountingReportForm
