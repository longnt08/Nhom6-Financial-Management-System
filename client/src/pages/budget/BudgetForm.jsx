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
        <div>
            <h2>
                {id ? 'Chỉnh sửa Budget' : 'Tạo Budget mới'}
                {error && <span style={{ color: 'red' }}>{error}</span>}
            </h2>

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>User ID:</label>
                    <input
                        type="text"
                        name="user_id"
                        value={budget.user_id}
                        onChange={handleInputChange}
                        placeholder="Enter user ID (e.g., 67b5ff8c8332ff332b65f6ee)"
                    />
                </div>

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
                    <label>Loại Budget:</label>
                    <select
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
                    <label>Số tiền dự kiến:</label>
                    <input
                        type="number"
                        name="expected_amount"
                        step="0.01"
                        value={budget.expected_amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Số tiền đã chi:</label>
                    <input
                        type="number"
                        name="spent_amount"
                        step="0.01"
                        value={budget.spent_amount}
                        onChange={handleInputChange}
                        required
                    />
                </div>

                <button type="submit">Lưu</button>
            </form>

            <button onClick={() => navigate('/budget')}>Quay lại danh sách</button>
        </div>
    );
};

export default BudgetForm;