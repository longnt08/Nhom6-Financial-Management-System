<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>


<html>
<head>
    <title>Giao dich ke toan</title>
    <style>
        table {
            border-collapse: collapse;
            width: 100%;
        }

        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }

    </style>
</head>
<body>

<div>
    <a style="background: blue; color:white; font-size: 30px; "
       href="<%=request.getContextPath()%>/accounting/record/create">Tao Giao Dich</a>
</div>
<h3>Danh sach giao dich</h3>
<table>
    <tr>
        <th>Ngay GD</th>
        <th>Code</th>
        <th>Ten</th>
        <th>Mo ta</th>
        <th>No</th>
        <th>Co</th>
        <th>Loai GD</th>
        <th></th>
        <th></th>
    </tr>
    <c:forEach items="${records}" var="record">
        <tr>
            <td>${record.date}</td>
            <td>${record.code}</td>
            <td>${record.name}</td>
            <td>${record.description}</td>
            <td>${record.debit}</td>
            <td>${record.credit}</td>
            <td>${record.category.getName()}</td>
            <td><a href="record/edit?id=<c:out value='${record.id}' />">Chinh sua</a>
            </td>
            <td>
                <a href="record/view?id=<c:out value='${record.id}' />">Chi tiet</a></td>
        </tr>
    </c:forEach>
</table>
</body>
</html>
