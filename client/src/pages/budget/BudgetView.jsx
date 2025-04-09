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
                const result = await BudgetService.getBudget(id);
                setBudget(result.data); // Giả sử API trả về {status: "success", data: {...}}
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

    // Format date for display (nếu budget có trường date)
    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>Budget: {budget.name || 'Budget ' + budget._id.$oid}</h1>
                <p>ID: {budget._id.$oid}</p>
            </div>

            <div>
                <p><strong>ID người tạo:</strong> {budget.user_id.$oid}</p>
                <p><strong>Loại budget:</strong> {budget.budget_type}</p>
                <p><strong>Số tiền dự kiến:</strong> {budget.expected_amount.toLocaleString('vi-VN')} VND</p>
                <p><strong>Số tiền đã chi:</strong> {budget.spent_amount.toLocaleString('vi-VN')} VND</p>
                {/* Nếu có thêm trường date trong data thực tế, có thể thêm như sau */}
                {/* <p><strong>Ngày tạo:</strong> {formatDate(budget.created_date)}</p> */}
            </div>

            <Link to="/budget">Quay lại danh sách</Link>
        </div>
    );
};

export default BudgetView;