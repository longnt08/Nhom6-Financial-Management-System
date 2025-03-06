<%--
  Created by IntelliJ IDEA.
  User: huybop
  Date: 3/5/2025
  Time: 11:51 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Báo cáo tài chính</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .report-header {
            text-align: center;
            margin-bottom: 30px;
        }
        .report-meta {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
        }
        .report-meta div {
            flex: 1;
        }
        table {
            border-collapse: collapse;
            width: 100%;
            margin-bottom: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }

        .back-link {
            margin-top: 20px;
            display: block;
        }
        .report-footer {
            margin-top: 40px;
            text-align: right;
        }
    </style>
</head>
<body>
<div class="report-header">
    <h1>${report.reportType}</h1>
    <p>Từ: <fmt:formatDate value="${report.startDate}" pattern="dd/MM/yyyy"/> - Đến: <fmt:formatDate value="${report.endDate}" pattern="dd/MM/yyyy"/></p>
</div>

<div class="report-meta">
    <div>
        <p><strong>Mã số thuế:</strong> ${report.tax_number != null && !report.tax_number.isEmpty() ? report.tax_number : ""}</p>
        <p><strong>Đơn vị nộp thuế:</strong> ${report.userId != null && !report.userId.isEmpty() ? report.userId : ""}</p>
    </div>
    <div>
        <p><strong>Ngày tạo:</strong> ${report.date_created}</p>
        <p><strong>ID báo cáo:</strong> ${report.id}</p>
    </div>
</div>



<table>
    <tr>
        <th>Danh mục</th>
        <th>Thành tiền</th>
    </tr>
    <c:forEach items="${report.content}" var="entry" >
        <tr>
            <td>${entry.category}</td>
            <td>${entry.amount}</td>
        </tr>
    </c:forEach>
</table>

<div class="report-footer">
    <p>Người lập báo cáo: ____________________</p>
    <p>Ngày: ____________________</p>
</div>

<a href="${pageContext.request.contextPath}/accounting/report" class="back-link">Quay lại danh sách báo cáo</a>
</body>
</html>