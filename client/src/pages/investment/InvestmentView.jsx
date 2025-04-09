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
                const result = await InvestmentService.getInvestment(id);
                setInvestment(result.data); // Giả sử API trả về {status: "success", data: {...}}
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
        if (!dateString) return '';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('vi-VN', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        }).format(date);
    };

    return (
        <div>
            <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1>Investment: {investment.investmentType} - {investment.id}</h1>
                <p>ID: {investment.id}</p>
            </div>

            <div>
                <p><strong>ID người tạo:</strong> {investment.userId}</p>
                <p><strong>Ngày đầu tư:</strong> {formatDate(investment.investDate)}</p>
                <p><strong>Ngày kết thúc:</strong> {formatDate(investment.endDate)}</p>
                <p><strong>Loại đầu tư:</strong> {investment.investmentType}</p>
                <p><strong>Số tiền đầu tư:</strong> {investment.investedAmount.toLocaleString('vi-VN')} VND</p>
                <p><strong>Tỷ lệ lợi nhuận kỳ vọng:</strong> {investment.expectedReturnRate}%</p>
            </div>

            <Link to="/investment">Quay lại danh sách</Link>
        </div>
    );
};

export default InvestmentView;