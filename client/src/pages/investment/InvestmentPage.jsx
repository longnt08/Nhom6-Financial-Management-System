import InvestmentService from "../../services/InvestmentService.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const InvestmentPage = () => {
    const [investments, setInvestments] = useState([]);
    const [tableStatus, setTableStatus] = useState("CLOSED");

    const handleFormAppearance = (newStatus) => {
        setTableStatus(tableStatus === "CLOSED" ? newStatus : "CLOSED");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await InvestmentService.getAllInvestments();
                setInvestments(response.data);
            } catch (error) {
                console.error("Error fetching investments:", error);
            }
        };
        fetchData();
    }, []);

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
            <h1>Investment Management</h1>
            <div>
                <button onClick={() => handleFormAppearance("LIST")}>
                    Danh sách Investment
                </button>
            </div>

            {tableStatus === "LIST" && (
                <div>
                    <h1>Danh sách Investment</h1>
                    <Link to="/investment/create">Tạo Investment mới</Link>

                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Loại</th>
                            <th>Số tiền đầu tư</th>
                            <th>Tỷ lệ lợi nhuận</th>
                            <th>Ngày đầu tư</th>
                            <th>Ngày kết thúc</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {investments.length > 0 ? (
                            investments.map(investment => (
                                <tr key={investment.id}>
                                    <td>{investment.id}</td>
                                    <td>{investment.investmentType}</td>
                                    <td>{investment.investedAmount.toLocaleString('vi-VN')} VND</td>
                                    <td>{investment.expectedReturnRate.toFixed(2)}%</td>
                                    <td>{formatDate(investment.investDate)}</td>
                                    <td>{formatDate(investment.endDate)}</td>
                                    <td>
                                        <Link to={`/investment/edit/${investment.id}`}>Chỉnh sửa</Link>
                                    </td>
                                    <td>
                                        <Link to={`/investment/view/${investment.id}`}>Chi tiết</Link>
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