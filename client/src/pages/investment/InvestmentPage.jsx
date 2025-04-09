import { useEffect, useState } from 'react';
import InvestmentService from '../../services/InvestmentService';

const InvestmentPage = () => {
    const [investments, setInvestments] = useState([]);
    const [tableStatus, setTableStatus] = useState('CLOSED');

    const handleFormAppearance = (newStatus) => {
        setTableStatus(tableStatus === 'CLOSED' ? newStatus : 'CLOSED');
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await InvestmentService.getAllInvestments();
                setInvestments(response.data); // Giả sử API trả về {status: "success", data: [...]}
            } catch (error) {
                console.error('Error fetching investments:', error);
            }
        };
        fetchData();
    }, []);

    const formatDate = (dateString, includeTime = true) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        if (!includeTime) return `${day}/${month}/${year}`;
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div>
            <h1>Investment Management</h1>
            <div>
                <button onClick={() => handleFormAppearance('LIST')}>
                    Danh sách Investment
                </button>
            </div>

            {tableStatus === 'LIST' && (
                <div>
                    <h1>Danh sách Investment</h1>
                    <a href="/investment/record/create">Tạo Investment mới</a>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Ngày đầu tư</th>
                            <th>Ngày kết thúc</th>
                            <th>Loại đầu tư</th>
                            <th>Số tiền đầu tư</th>
                            <th>Tỷ lệ lợi nhuận kỳ vọng</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {investments.length > 0 ? (
                            investments.map((investment) => (
                                <tr key={investment.id}>
                                    <td>{investment.id}</td>
                                    <td>{formatDate(investment.investDate)}</td>
                                    <td>{formatDate(investment.endDate)}</td>
                                    <td>{investment.investmentType}</td>
                                    <td>{investment.investedAmount.toLocaleString('vi-VN')}</td>
                                    <td>{investment.expectedReturnRate}%</td>
                                    <td>
                                        <a href={`/investment/record/edit/${investment.id}`}>Chỉnh sửa</a>
                                    </td>
                                    <td>
                                        <a href={`/investment/record/view/${investment.id}`}>Chi tiết</a>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="8">Không có dữ liệu</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default InvestmentPage;