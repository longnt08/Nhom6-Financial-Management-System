<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>


<html>
<head>
    <title>Giao dich ke toan</title>
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
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .report-header {
            text-align: center;
            margin-bottom: 30px;
        }
        a {
            display: block;
            margin-top: 20px;
            color: #3498db;
            text-decoration: none;
        }
    </style>
</head>
<body>

<div class="report-header">
    <h1>Danh sách giao dịch kế toán</h1>
    <a style=" font-size: 30px; "
       href="<%=request.getContextPath()%>/accounting/record/create">Tạo giao dịch</a>
    <a style=" font-size: 30px; "
       href="<%=request.getContextPath()%>/accounting/report">Chuyển đến báo cáo kế toán</a>
</div>
<table>
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
    <c:forEach items="${records}" var="record">
        <tr>
            <td><fmt:formatDate value="${record.date}" pattern="dd/MM/yyyy HH:mm"/></td>
            <td>${record.code}</td>
            <td>${record.name}</td>
            <td>${record.description}</td>
            <td>${record.debit}</td>
            <td>${record.credit}</td>
            <td>${record.category.getName()}</td>
            <td><a href="record/edit?id=<c:out value='${record.id}' />">Chỉnh Sửa</a>
            </td>
            <td>
                <a href="record/view?id=<c:out value='${record.id}' />">Chi tiết</a></td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
