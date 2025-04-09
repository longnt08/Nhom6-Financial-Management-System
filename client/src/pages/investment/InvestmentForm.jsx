import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import InvestmentService from '../../services/InvestmentService';

const InvestmentForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(null);

    const [investment, setInvestment] = useState({
        userId: '67b5ff8c8332ff332b65f6ee', // Giả sử userId mặc định
        investDate: '',
        endDate: '',
        investmentType: '',
        investedAmount: 0,
        expectedReturnRate: 0,
    });

    const investmentTypes = [
        { value: 'STOCK', name: 'Cổ phiếu' },
        { value: 'REAL_ESTATE', name: 'Bất động sản' },
        { value: 'BOND', name: 'Trái phiếu' },
        { value: 'CRYPTO', name: 'Tiền điện tử' },
    ];

    useEffect(() => {
        if (id) {
            InvestmentService.getInvestment(id)
                .then((data) => {
                    if (data.investDate) {
                        data.formattedInvestDate = new Date(data.investDate).toISOString().substring(0, 16);
                    }
                    if (data.endDate) {
                        data.formattedEndDate = new Date(data.endDate).toISOString().substring(0, 16);
                    }
                    setInvestment(data);
                })
                .catch((error) => {
                    setError('Error loading investment: ' + error.message);
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setInvestment({
            ...investment,
            [name]:
                name === 'investedAmount' || name === 'expectedReturnRate'
                    ? parseFloat(value)
                    : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitInvestment = {
            ...investment,
            investDate: new Date(investment.investDate).toISOString(),
            endDate: new Date(investment.endDate).toISOString(),
            id: id,
        };

        const savePromise = id
            ? InvestmentService.updateInvestment(submitInvestment)
            : InvestmentService.createInvestment(submitInvestment);

        savePromise
            .then(() => {
                navigate('/investment');
            })
            .catch((error) => {
                setError('Error saving investment: ' + error.message);
            });
    };

    return (
        <div>
            <h2>
                {id ? 'Chỉnh sửa Investment' : 'Tạo Investment mới'}
                {error && <span style={{ color: 'red' }}>{error}</span>}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Ngày đầu tư:</label>
                    <input
                        type="datetime-local"
                        name="investDate"
                        value={
                            investment.formattedInvestDate ||
                            (investment.investDate
                                ? new Date(investment.investDate).toISOString().substring(0, 16)
                                : '')
                        }
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Ngày kết thúc:</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={
                            investment.formattedEndDate ||
                            (investment.endDate
                                ? new Date(investment.endDate).toISOString().substring(0, 16)
                                : '')
                        }
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Loại đầu tư:</label>
                    <select
                        name="investmentType"
                        value={investment.investmentType}
                        onChange={handleInputChange}
                        required
                    >
                        <option value="">Chọn loại đầu tư</option>
                        {investmentTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-group">
                    <label>Số tiền đầu tư:</label>
                    <input
                        type="number"
                        name="investedAmount"
                        step="0.01"
                        value={investment.investedAmount}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Tỷ lệ lợi nhuận kỳ vọng (%):</label>
                    <input
                        type="number"
                        name="expectedReturnRate"
                        step="0.01"
                        value={investment.expectedReturnRate}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit">Lưu</button>
            </form>

            <button onClick={() => navigate('/investment')}>Quay lại danh sách</button>
        </div>
    );
};

export default InvestmentForm;