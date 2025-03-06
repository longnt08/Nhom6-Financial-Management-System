<%--
  Created by IntelliJ IDEA.
  User: huybop
  Date: 3/5/2025
  Time: 11:50 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
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
        a {
            display: block;
            margin-top: 20px;
            color: #3498db;
            text-decoration: none;
        }
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .report-header {
            text-align: center;
            margin-bottom: 30px;
        }
    </style>
    <title>Báo cáo kế toán</title>
</head>
<body>
<div class="report-header">
    <h1>Danh sách báo cáo</h1>
    <a style="font-size: 30px;" href="<%=request.getContextPath()%>/accounting/report/create">Tạo báo cáo mới</a>
    <a style="font-size: 30px;" href="<%=request.getContextPath()%>/accounting/record">Chuyển đến giao dịch</a>
</div>

<table>
    <tr>
        <th>Ngày tạo</th>
        <th>Loại báo cáo</th>
        <th>Ngày bắt đầu</th>
        <th>Ngày kết thúc</th>
        <th></th>
        <th></th>
    </tr>
    <c:forEach items="${reports}" var="report">
        <tr>
            <td><fmt:formatDate value="${report.date_created}" pattern="dd/MM/yyyy HH:mm"/></td>
            <td>${report.reportType}</td>
            <td><fmt:formatDate value="${report.startDate}" pattern="dd/MM/yyyy"/></td>
            <td><fmt:formatDate value="${report.endDate}" pattern="dd/MM/yyyy"/></td>
            <td><a href="report/edit?id=<c:out value='${report.id}' />">Chỉnh sửa</a></td>
            <td><a href="report/view?id=<c:out value='${report.id}' />">Chi tiết</a></td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
