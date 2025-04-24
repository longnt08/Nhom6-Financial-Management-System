import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AccountingService from '../../services/AccountingService'

const AccountingRecordForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [error, setError] = useState(null)

  const [record, setRecord] = useState({
    date: '',
    code: '',
    name: '',
    description: '',
    debit: 0,
    credit: 0,
    category: 'SALE_AND_SERVICES_REVENUE'
  })

  const categories = [
    { value: 'SALE_AND_SERVICES_REVENUE', name: 'Doanh thu bán hàng và cung cấp dịch vụ' },
    { value: 'REVENUE_DEDUCTION', name: 'Các khoản giảm trừ doanh thu' },
    { value: 'FINANCIAL_ACTIVITY_REVENUE', name: 'Doanh thu hoạt động tài chính' },
    { value: 'COST_OF_SALES', name: 'Giá vốn bán hàng' },
    { value: 'FINANCIAL_EXPENSES', name: 'Chi phí tài chính' },
    { value: 'INTEREST_EXPENSES', name: 'Chi phí lãi vay' },
    { value: 'BUSINESS_EXPENSES', name: 'Chi phí quản lý kinh doanh' },
    { value: 'OTHER_INCOME', name: 'Thu nhập khác' },
    { value: 'OTHER_EXPENSES', name: 'Chi phí khác' }
  ]

  useEffect(() => {
    if (id) {
      AccountingService.getRecord(id)
        .then(data => {
          if (data.date) {
            const dateObj = new Date(data.date);
            if (!isNaN(dateObj.getTime())) {
              data.formattedDate = dateObj.toISOString().substring(0, 16);
            }
          }
          setRecord(data.data)
        })
        .catch(error => {
          setError('Error loading record: ' + error.message)
        })
    }
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setRecord({
      ...record,
      [name]: name === 'debit' || name === 'credit' ? parseFloat(value) : value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const submitRecord = {
      ...record,
      user_id: localStorage.getItem('id'),
      id: id
    }

    if (submitRecord.date && !submitRecord.date.endsWith('Z')) {
      submitRecord.date = new Date(submitRecord.date).toISOString();
    }

    console.log(submitRecord)
    const savePromise = id
      ? AccountingService.updateRecord(submitRecord) 
      : AccountingService.createRecord(submitRecord)

    savePromise
      .then(() => {
        navigate('/accounting')
      })
      .catch(error => {
        setError('Error saving record: ' + error.message)
      })
  }

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>
          {id ? 'Chỉnh Sửa Ghi Chép' : 'Thêm Ghi Chép Mới'}
        </h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Tên <span className="required">*</span>:</label>
            <input 
              type="text" 
              id="name"
              name="name" 
              value={record.name} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="date">Ngày <span className="required">*</span>:</label>
            <input 
              type="datetime-local" 
              id="date"
              name="date" 
              value={record.formattedDate || (record.date ? new Date(record.date).toISOString().substring(0, 16) : '')} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="code">Mã <span className="required">*</span>:</label>
            <input 
              type="text" 
              id="code"
              name="code" 
              value={record.code} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="debit">Nợ <span className="required">*</span>:</label>
            <input 
              type="number" 
              id="debit"
              name="debit" 
              step="0.01"
              value={record.debit} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="credit">Có <span className="required">*</span>:</label>
            <input 
              type="number" 
              id="credit"
              name="credit" 
              step="0.01"
              value={record.credit} 
              onChange={handleInputChange} 
              required 
            />
          </div>

          <div className="form-group">
            <label htmlFor="category">Loại <span className="required">*</span>:</label>
            <select 
              id="category"
              name="category" 
              value={record.category} 
              onChange={handleInputChange}
              style={{ padding: '10px', width: '300px', border: 'none', borderRadius: '20px', backgroundColor: '#ddd', textAlign: 'left' }}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Mô tả:</label>
            <input 
              type="text" 
              id="description"
              name="description" 
              value={record.description} 
              onChange={handleInputChange}
            />
          </div>

          <button type="submit" className="submit-btn">Lưu</button>
        </form>

        <p>
          <a href="#" onClick={() => navigate('/accounting')}>Quay lại danh sách</a>
        </p>
      </div>
    </div>
  )
}

export default AccountingRecordForm
