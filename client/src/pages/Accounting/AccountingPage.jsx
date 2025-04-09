import AccountingService from "../../services/AccountingService.js";
import {useEffect, useState} from "react";

const AccountingPage = () => {
  const [records, setRecord] = useState([])
  const [reports, setReport] = useState([])
  const [tableStatus, setTableStatus] = useState("CLOSED")
  
  const handleFormAppearance = (newStatus) => {
    if (tableStatus === "CLOSED") {
      setTableStatus(newStatus)
    } else {
      setTableStatus("CLOSED")
    }
  }
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const recordsResponse = await AccountingService.getAllRecord()
        const reportsResponse = await AccountingService.getAllReport()
        setRecord(recordsResponse.data)
        setReport(reportsResponse.data)
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
    fetchData()
  }, []);
  
  // Function to format dates
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
      <h1>Trang kế toán</h1>
      <div>
        <button onClick={() => handleFormAppearance("RECORD")}>
          Giao dịch kế toán
        </button>

        <button onClick={() => handleFormAppearance("REPORT")}>
          Báo cáo kế toán
        </button>
      </div>

      {tableStatus === "RECORD" && (
        <div>
          <h1>Danh sách giao dịch kế toán</h1>
          <a href="/accounting/record/create">Tạo giao dịch</a>
          
          <table>
            <thead>
              <tr>
                <th>Ngày GD</th>
                <th>Code</th>
                <th>Tên</th>
                <th>Mô tả</th>
                <th>Nợ</th>
                <th>Có</th>
                <th>Loại GD</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {records.length > 0 ? (
                records.map(record => (
                  <tr key={record.id}>
                    <td>{formatDate(record.date)}</td>
                    <td>{record.code}</td>
                    <td>{record.name}</td>
                    <td>{record.description}</td>
                    <td>{record.debit}</td>
                    <td>{record.credit}</td>
                    <td>{record.category?.name}</td>
                    <td>
                      <a href={`/accounting/record/edit/${record.id}`}>Chỉnh Sửa</a>
                    </td>
                    <td>
                      <a href={`/accounting/record/view/${record.id}`}>Chi tiết</a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {tableStatus === "REPORT" && (
        <div>
          <h1>Danh sách báo cáo</h1>
          <a href="/accounting/report/create">Tạo báo cáo mới</a>
          
          <table>
            <thead>
              <tr>
                <th>Ngày tạo</th>
                <th>Loại báo cáo</th>
                <th>Ngày bắt đầu</th>
                <th>Ngày kết thúc</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map(report => (
                  <tr key={report.id}>
                    <td>{formatDate(report.date_created)}</td>
                    <td>{report.reportType}</td>
                    <td>{formatDate(report.startDate, false)}</td>
                    <td>{formatDate(report.endDate, false)}</td>
                    <td>
                      <a href={`/accounting/report/edit/${report.id}`}>Chỉnh sửa</a>
                    </td>
                    <td>
                      <a href={`/accounting/report/view/${report.id}`}>Chi tiết</a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6">Không có dữ liệu</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default AccountingPage
