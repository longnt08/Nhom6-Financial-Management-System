import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InvestmentService from '../../services/InvestmentService';

const InvestmentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(null);

    const [investment, setInvestment] = useState({
        userId: '',
        investmentType: 'STOCK',
        investedAmount: 0,
        expectedReturnRate: 0,
        investDate: '',
        endDate: ''
    });

    const investmentTypes = [
        { value: 'STOCK', name: 'Cổ phiếu' },
        { value: 'BOND', name: 'Trái phiếu' },
        { value: 'REAL_ESTATE', name: 'Bất động sản' },
        { value: 'MUTUAL_FUND', name: 'Quỹ tương hỗ' }
    ];

    useEffect(() => {
        if (id) {
            InvestmentService.getInvestment(id)
                .then(response => {
                    const data = response.data;
                    setInvestment({
                        userId: data.userId || '',
                        investmentType: data.investmentType || 'STOCK',
                        investedAmount: data.investedAmount || 0,
                        expectedReturnRate: data.expectedReturnRate || 0,
                        investDate: data.investDate ? new Date(data.investDate).toISOString().substring(0, 16) : '',
                        endDate: data.endDate ? new Date(data.endDate).toISOString().substring(0, 16) : ''
                    });
                })
                .catch(error => {
                    setError('Error loading investment: ' + error.message);
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvestment({
            ...investment,
            [name]: name === 'investedAmount' || name === 'expectedReturnRate' ? parseFloat(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitInvestment = {
            ...investment,
            userId: investment.userId || '67b5ff8e8332ff332b65f6fe', // Default userId if needed
            investedAmount: parseFloat(investment.investedAmount),
            expectedReturnRate: parseFloat(investment.expectedReturnRate),
            investDate: investment.investDate ? new Date(investment.investDate).toISOString() : null,
            endDate: investment.endDate ? new Date(investment.endDate).toISOString() : null
        };

        const savePromise = id
            ? InvestmentService.updateInvestment({ ...submitInvestment, id })
            : InvestmentService.createInvestment(submitInvestment);

        savePromise
            .then(() => {
                navigate('/investment');
            })
            .catch(error => {
                setError('Error saving investment: ' + error.message);
            });
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h2>
                    {id ? 'Chỉnh sửa đầu tư' : 'Tạo đầu tư mới'}
                </h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="userId">User ID <span className="required">*</span>:</label>
                        <input
                            type="text"
                            id="userId"
                            name="userId"
                            value={investment.userId}
                            onChange={handleInputChange}
                            placeholder="Enter user ID (e.g., 67b5ff8e8332ff332b65f6fe)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="investmentType">Loại Đầu Tư<span className="required">*</span>:</label>
                        <select
                            id="investmentType"
                            name="investmentType"
                            value={investment.investmentType}
                            onChange={handleInputChange}
                            style={{ padding: '10px', width: '300px', border: 'none', borderRadius: '20px', backgroundColor: '#ddd', textAlign: 'left' }}
                        >
                            {investmentTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="investedAmount">Số tiền đầu tư <span className="required">*</span>:</label>
                        <input
                            type="number"
                            id="investedAmount"
                            name="investedAmount"
                            step="0.01"
                            value={investment.investedAmount}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="expectedReturnRate">Lợi nhuận kỳ vọng <span className="required">*</span>:</label>
                        <input
                            type="number"
                            id="expectedReturnRate"
                            name="expectedReturnRate"
                            step="0.01"
                            value={investment.expectedReturnRate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="investDate">Ngày đầu tư <span className="required">*</span>:</label>
                        <input
                            type="datetime-local"
                            id="investDate"
                            name="investDate"
                            value={investment.investDate}
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
                            value={investment.endDate}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">Lưu</button>
                </form>

                <p>
                    <a href="#" onClick={() => navigate('/investment')}>Quay lại danh sách</a>
                </p>
            </div>
        </div>
    );
};

export default InvestmentForm;
