<%--
  Created by IntelliJ IDEA.
  User: huybop
  Date: 2/27/2025
  Time: 11:58 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Chi tiet giao dich</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        .report-header {
            text-align: center;
            margin-bottom: 30px;
        }
    </style>
</head>
<body>
<div>

    <div class="report-header">
        <h1>Giao dich: ${record.name}</h1>
        <p>ID: ${record.id}</p>
    </div>
    <p>Ngay giao dich: <fmt:formatDate value="${record.date}" pattern="dd/MM/yyyy HH:mm"/></p>
    <p>Ngay khai bao: <fmt:formatDate value="${record.reference_date}" pattern="dd/MM/yyyy HH:mm"/></p>
    <p>Ma giao dich: ${record.code}</p>
    <p>Mo ta: ${record.description}</p>
    <p>So tien no: ${record.debit}</p>
    <p>So tien co: ${record.credit}</p>
    <p>Loai giao dich: ${record.category.getName()}</p>
    <p>Id nguoi tao: ${record.user_id}</p>
</div>
<a href="${pageContext.request.contextPath}/accounting/record">Quay lai danh sach</a>
</body>
</html>
