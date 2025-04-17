import BudgetService from "../../services/BudgetService.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);
    const [tableStatus, setTableStatus] = useState("CLOSED");

    const handleFormAppearance = (newStatus) => {
        setTableStatus(tableStatus === "CLOSED" ? newStatus : "CLOSED");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await BudgetService.getAllBudgets();
                setBudgets(response.data);
            } catch (error) {
                console.error("Error fetching budgets:", error);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Quản lý ngân sách</h1>

            <div className="container">
                <div className="box">
                    <h3>Ghi chép các giao dịch ngân sách</h3>
                    <div className="buttons">
                        <button onClick={() => handleFormAppearance("LIST")}>Xem</button>
                        <button onClick={() => window.location.href="/budget/create"}>Tạo</button>
                    </div>
                </div>

            </div>

            {tableStatus === "LIST" && (
                <div>
                    <h1>Danh sách ngân sách</h1>
                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Loại</th>
                            <th>Số tiền dự kiến</th>
                            <th>Số tiền đã chi</th>
                            <th></th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {budgets.length > 0 ? (
                            budgets.map(budget => (
                                <tr key={budget.id}>
                                    <td>{budget.id}</td>
                                    <td>{budget.name}</td>
                                    <td>{budget.budget_type}</td>
                                    <td>{budget.expected_amount.toLocaleString('vi-VN')} VND</td>
                                    <td>{budget.spent_amount.toLocaleString('vi-VN')} VND</td>
                                    <td>
                                        <Link to={`/budget/edit/${budget.id}`}>Chỉnh sửa</Link>
                                    </td>
                                    <td>
                                        <Link to={`/budget/view/${budget.id}`}>Chi tiết</Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">Không có dữ liệu</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default BudgetPage;
