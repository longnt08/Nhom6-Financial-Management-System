import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BudgetService from '../../services/BudgetService';

const BudgetView = () => {
    const [budget, setBudget] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchBudget = async () => {
            try {
                setLoading(true);
                const response = await BudgetService.getBudget(id);
                setBudget(response.data);
            } catch (err) {
                setError('Không thể tải thông tin budget');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBudget();
        }
    }, [id]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;
    if (!budget) return <div>Không tìm thấy budget</div>;

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>Budget: {budget.name || 'Budget ' + budget.id}</h1>
                <p>ID: {budget.id}</p>
            </div>

            <div>
                <p><strong>ID người tạo:</strong> {budget.user_id}</p>
                <p><strong>Tên:</strong> {budget.name}</p>
                <p><strong>Loại budget:</strong> {budget.budget_type}</p>
                <p><strong>Số tiền dự kiến:</strong> {budget.expected_amount.toLocaleString('vi-VN')} VND</p>
                <p><strong>Số tiền đã chi:</strong> {budget.spent_amount.toLocaleString('vi-VN')} VND</p>
            </div>

            <Link to="/budget">Quay lại danh sách</Link>
        </div>
    );
};

export default BudgetView;