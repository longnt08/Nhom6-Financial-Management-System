import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import BudgetService from '../../services/BudgetService';

const BudgetForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [error, setError] = useState(null);

    const [budget, setBudget] = useState({
        user_id: '',
        name: '',
        budget_type: 'TECHNOLOGY',
        expected_amount: 0,
        spent_amount: 0
    });

    const budgetTypes = [
        { value: 'TECHNOLOGY', name: 'Công nghệ' },
        { value: 'FOOD', name: 'Thực phẩm' },
        { value: 'HUMAN_RESOURCES', name: 'Nhân sự' },
        { value: 'OPERATION', name: 'Tổ chức' },
        { value: 'MARKETING', name: 'Thị trường' }
    ];

    useEffect(() => {
        if (id) {
            BudgetService.getBudget(id)
                .then(response => {
                    const data = response.data;
                    setBudget({
                        user_id: data.user_id || '',
                        name: data.name || '',
                        budget_type: data.budget_type || 'TECHNOLOGY',
                        expected_amount: data.expected_amount || 0,
                        spent_amount: data.spent_amount || 0
                    });
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
            [name]: name === 'expected_amount' || name === 'spent_amount' ? parseFloat(value) : value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const submitBudget = {
            ...budget,
            user_id: budget.user_id || '67b5ff8c8332ff332b65f6ee', // Giá trị mặc định nếu cần
            expected_amount: parseFloat(budget.expected_amount),
            spent_amount: parseFloat(budget.spent_amount)
        };

        const savePromise = id
            ? BudgetService.updateBudget({ ...submitBudget, id })
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
        <div className="auth-container">
            <div className="auth-form">
                <h2>
                    {id ? 'Chỉnh sửa ngân sách' : 'Tạo ngân sách mới'}
                </h2>
                {error && <div className="error-message">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="user_id">User ID <span className="required">*</span>:</label>
                        <input
                            type="text"
                            id="user_id"
                            name="user_id"
                            value={budget.user_id}
                            onChange={handleInputChange}
                            placeholder="Enter user ID (e.g., 67b5ff8c8332ff332b65f6ee)"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="name">Tên <span className="required">*</span>:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={budget.name}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="budget_type">Loại ngân sách<span className="required">*</span>:</label>
                        <select
                            id="budget_type"
                            name="budget_type"
                            value={budget.budget_type}
                            onChange={handleInputChange}
                        >
                            {budgetTypes.map(type => (
                                <option key={type.value} value={type.value}>
                                    {type.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="expected_amount">Số tiền dự kiến <span className="required">*</span>:</label>
                        <input
                            type="number"
                            id="expected_amount"
                            name="expected_amount"
                            step="0.01"
                            value={budget.expected_amount}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="spent_amount">Số tiền đã chi <span className="required">*</span>:</label>
                        <input
                            type="number"
                            id="spent_amount"
                            name="spent_amount"
                            step="0.01"
                            value={budget.spent_amount}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <button type="submit" className="submit-btn">Lưu</button>
                </form>

                <p>
                    <a href="#" onClick={() => navigate('/budget')}>Quay lại danh sách</a>
                </p>
            </div>
        </div>
    );
};

export default BudgetForm;
