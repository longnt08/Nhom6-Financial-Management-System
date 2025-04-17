import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import InvestmentService from '../../services/InvestmentService';

const InvestmentView = () => {
    const [investment, setInvestment] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchInvestment = async () => {
            try {
                setLoading(true);
                const response = await InvestmentService.getInvestment(id);
                setInvestment(response.data);
            } catch (err) {
                setError('Không thể tải thông tin investment');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchInvestment();
        }
    }, [id]);

    if (loading) return <div>Đang tải...</div>;
    if (error) return <div>Lỗi: {error}</div>;
    if (!investment) return <div>Không tìm thấy investment</div>;

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>Investment: {investment.investmentType || 'Investment ' + investment.id}</h1>
                <p>ID: {investment.id}</p>
            </div>

            <div>
                <p><strong>ID người tạo:</strong> {investment.userId}</p>
                <p><strong>Loại investment:</strong> {investment.investmentType}</p>
                <p><strong>Số tiền đầu tư:</strong> {investment.investedAmount.toLocaleString('vi-VN')} VND</p>
                <p><strong>Tỷ lệ lợi nhuận kỳ vọng:</strong> {investment.expectedReturnRate.toFixed(2)}%</p>
                <p><strong>Ngày đầu tư:</strong> {formatDate(investment.investDate)}</p>
                <p><strong>Ngày kết thúc:</strong> {formatDate(investment.endDate)}</p>
            </div>

            <Link to="/investment">Quay lại danh sách</Link>
        </div>
    );
};

export default InvestmentView;