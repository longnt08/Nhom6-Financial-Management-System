import {useState, useEffect} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import AccountingService from '../../services/AccountingService'

const AccountingReportForm = () => {
  const navigate = useNavigate()
  const {id} = useParams()
  const [error, setError] = useState(null)

  const [report, setReport] = useState({
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
      user_id: localStorage.getItem('id'),
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
    <div className="auth-container">
      <div className="auth-form">
        <h2>
          {id ? 'Chỉnh sửa báo cáo' : 'Tạo báo cáo mới'}
        </h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="reportType">Loại báo cáo <span className="required">*</span>:</label>
            <input
              type="text"
              id="reportType"
              name="reportType"
              value={report.reportType}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="startDate">Ngày bắt đầu <span className="required">*</span>:</label>
            <input
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={formatDateForInput(report.startDate)}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="endDate">Ngày kết thúc <span className="required">*</span>:</label>
            <input
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={formatDateForInput(report.endDate)}
              onChange={handleInputChange}
              required
            />
          </div>

          <button type="submit" className="submit-btn">Lưu báo cáo</button>
        </form>

        <p>
          <a href="#" onClick={() => navigate('/accounting')}>Quay lại danh sách</a>
        </p>
      </div>
    </div>
  )
}

export default AccountingReportForm
