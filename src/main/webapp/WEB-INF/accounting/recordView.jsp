<%--
  Created by IntelliJ IDEA.
  User: huybop
  Date: 2/27/2025
  Time: 11:58 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Chi tiet giao dich</title>
</head>
<body>
<div>

    <h1>Giao dich: ${record.name}</h1>
    <p>ID: ${record.id}</p>
    <p>Ngay giao dich: ${record.date}</p>
    <p>Ngay khai bao: ${record.reference_date}</p>
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
