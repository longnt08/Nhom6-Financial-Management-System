import BudgetService from "../../services/BudgetService.js";
import { useEffect, useState } from "react";

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

    const formatDate = (dateString, includeTime = true) => {
        if (!dateString) return "";
        const date = new Date(dateString);

        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        if (!includeTime) {
            return `${day}/${month}/${year}`;
        }

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    };

    return (
        <div>
            <h1>Budget Management</h1>
            <div>
                <button onClick={() => handleFormAppearance("LIST")}>
                    Danh sách Budget
                </button>
            </div>

            {tableStatus === "LIST" && (
                <div>
                    <h1>Danh sách Budget</h1>
                    <a href="/budget/create">Tạo Budget mới</a>

                    <table>
                        <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Số tiền</th>
                            <th>Ngày bắt đầu</th>
                            <th>Ngày kết thúc</th>
                            <th>Loại</th>
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
                                    <td>{budget.amount}</td>
                                    <td>{formatDate(budget.startDate)}</td>
                                    <td>{formatDate(budget.endDate)}</td>
                                    <td>{budget.type}</td>
                                    <td>
                                        <a href={`/budget/edit/${budget.id}`}>Chỉnh sửa</a>
                                    </td>
                                    <td>
                                        <a href={`/budget/view/${budget.id}`}>Chi tiết</a>
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

export default BudgetPage;