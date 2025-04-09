import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BudgetService from '../../services/BudgetService';

const BudgetForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(null);

    const [budget, setBudget] = useState({
        name: '',
        amount: 0,
        startDate: '',
        endDate: '',
        type: 'MONTHLY'
    });

    const budgetTypes = [
        { value: 'MONTHLY', name: 'Hàng tháng' },
        { value: 'QUARTERLY', name: 'Hàng quý' },
        { value: 'YEARLY', name: 'Hàng năm' }
    ];

    useEffect(() => {
        if (id) {
            BudgetService.getBudget(id)
                .then(data => {
                    if (data.startDate) {
                        data.formattedStartDate = new Date(data.startDate).toISOString().substring(0, 16);
                    }
                    if (data.endDate) {
                        data.formattedEndDate = new Date(data.endDate).toISOString().substring(0, 16);
                    }
                    setBudget(data);
                })
                .catch(error => {
                    setError('Error loading budget: ' + error.message);
                });
        }
    }, [id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setBudget({
            ...budget,
            [name]: name === 'amount' ? parseFloat(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitBudget = {
            ...budget,
            startDate: new Date(budget.startDate).toISOString(),
            endDate: new Date(budget.endDate).toISOString(),
            id: id
        };

        const savePromise = id
            ? BudgetService.updateBudget(submitBudget)
            : BudgetService.createBudget(submitBudget);

        savePromise
            .then(() => {
                navigate('/budget');
            })
            .catch(error => {
                setError('Error saving budget: ' + error.message);
            });
    };

    return (
        <div>
            <h2>
                {id ? 'Chỉnh sửa Budget' : 'Tạo Budget mới'}
                {error && <span style={{ color: 'red' }}>{error}</span>}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Tên:</label>
                    <input
                        type="text"
                        name="name"
                        value={budget.name}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Số tiền:</label>
                    <input
                        type="number"
                        name="amount"
                        step="0.01"
                        value={budget.amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Ngày bắt đầu:</label>
                    <input
                        type="datetime-local"
                        name="startDate"
                        value={budget.formattedStartDate || (budget.startDate ? new Date(budget.startDate).toISOString().substring(0, 16) : '')}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Ngày kết thúc:</label>
                    <input
                        type="datetime-local"
                        name="endDate"
                        value={budget.formattedEndDate || (budget.endDate ? new Date(budget.endDate).toISOString().substring(0, 16) : '')}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Loại:</label>
                    <select
                        name="type"
                        value={budget.type}
                        onChange={handleInputChange}
                    >
                        {budgetTypes.map(type => (
                            <option key={type.value} value={type.value}>
                                {type.name}
                            </option>
                        ))}
                    </select>
                </div>

                <button type="submit">Lưu</button>
            </form>

            <button onClick={() => navigate('/budget')}>Quay lại danh sách</button>
        </div>
    );
};

export default BudgetForm;