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
                setError('Không thể tải thông tin ngân sách');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchBudget();
        }
    }, [id]);

    if (loading) return <div className="loading-message">Đang tải...</div>;
    if (error) return <div className="error-message">Lỗi: {error}</div>;
    if (!budget) return <div className="error-message">Không tìm thấy ngân sách</div>;

    return (
        <div className="view-container">
            <div className="view-header">
                <h1>Ngân sách: {budget.name || 'Ngân sách ' + budget.id}</h1>
                <p className="id-display">ID: {budget.id}</p>
            </div>

            <div className="view-content">
                <div className="info-card">
                    <p><strong>ID người tạo:</strong> {budget.user_id}</p>
                    <p><strong>Tên:</strong> {budget.name}</p>
                    <p><strong>Loại ngân sách:</strong> {budget.budget_type}</p>
                    <p><strong>Số tiền dự kiến:</strong> {budget.expected_amount.toLocaleString('vi-VN')} VND</p>
                    <p><strong>Số tiền đã chi:</strong> {budget.spent_amount.toLocaleString('vi-VN')} VND</p>
                </div>
            </div>

            <div className="view-footer">
                <Link to="/budget" className="back-link">Quay lại danh sách</Link>
            </div>
        </div>
    );
};

export default BudgetView;
