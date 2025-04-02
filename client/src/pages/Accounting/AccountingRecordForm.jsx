import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AccountingService from '../../services/AccountingService'

const AccountingRecordForm = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [error, setError] = useState(null)
  
  const [record, setRecord] = useState({
    user_id: '',
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
          setRecord(data)
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
      // user_id: record.user_id || localStorage.getItem('userId'), // Use local storage for user_id
      user_id: '67b5ff8e8332ff332b65f6fe',
      id: id // Include id for updates
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
    <div>
      <h2>
        {id ? 'Chỉnh Sửa Ghi Chép' : 'Thêm Ghi Chép Mới'}
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tên:</label>
          <input 
            type="text" 
            name="name" 
            value={record.name} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Ngày:</label>
          <input 
            type="datetime-local" 
            name="date" 
            value={record.formattedDate || (record.date ? new Date(record.date).toISOString().substring(0, 16) : '')} 
            onChange={handleInputChange} 
            required 
          />
        </div>
            
        <div className="form-group">
          <label>Mã:</label>
          <input 
            type="text" 
            name="code" 
            value={record.code} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Nợ:</label>
          <input 
            type="number" 
            name="debit" 
            step="0.01"
            value={record.debit} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Có:</label>
          <input 
            type="number" 
            name="credit" 
            step="0.01"
            value={record.credit} 
            onChange={handleInputChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Loại:</label>
          <select 
            name="category" 
            value={record.category} 
            onChange={handleInputChange}
          >
            {categories.map(cat => (
              <option key={cat.value} value={cat.value}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label>Mô tả:</label>
          <input 
            type="text" 
            name="description" 
            value={record.description} 
            onChange={handleInputChange}
          />
        </div>
        
        <button type="submit">Lưu</button>
      </form>
      
      <button onClick={() => navigate('/accounting')}>Quay lại danh sách</button>
    </div>
  )
}

export default AccountingRecordForm
