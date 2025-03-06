<%--
  Created by IntelliJ IDEA.
  record: huybop
  Date: 3/2/2025
  Time: 5:32 PM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page import="org.example.api.accounting.AccountingTypes" %>
<html>
<head>
    <title>Ghi Chép Kế Toán</title>
    <meta charset="UTF-8">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
        }
        h2 {
            color: #2c3e50;
        }
        .form-group {
            margin: 10px 0;
        }
        label {
            display: inline-block;
            width: 100px;
            font-weight: bold;
        }
        input, select {
            padding: 8px;
            width: 300px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background-color: #4CAF50;
            color: white;
            padding: 10px 15px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            margin-top: 15px;
        }
        button:hover {
            background-color: #45a049;
        }
        a {
            display: inline-block;
            margin-top: 20px;
            color: #3498db;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
<h2>
    <c:if test="${record != null}">
        Chỉnh Sửa Ghi Chép
    </c:if>
    <c:if test="${record == null}">
        Thêm Ghi Chép Mới
    </c:if>
    <c:if test="${error != null}">
        <span style="color: red">${error}</span>
    </c:if>
</h2>

<c:if test="${record != null}">
<form action="${pageContext.request.contextPath}/accounting/record/update" method="post">
    <input type="text" name="id" value="<c:out value='${record.id}' />" hidden>
    </c:if>
    <c:if test="${record == null}">
    <form action="${pageContext.request.contextPath}/accounting/record/insert" method="post">
        </c:if>
        <div class="form-group">
            <label>Tên:</label>
            <input type="text" name="name" value="<c:out value='${record.name}' />" required>
        </div>
        <c:if test="${record == null}">
            <div class="form-group">
                <label>Ngày:</label>
                <input type="datetime-local" name="date" value="<c:out value='${record.date}' />" required>
            </div>
            <div class="form-group">
                <label>Mã:</label>
                <input type="text" name="code" value="<c:out value='${record.code}' />" required>
            </div>
        </c:if>
        <div class="form-group">
            <label>Nợ:</label>
            <input type="text" name="debit" pattern="[0-9]+(\.[0-9]+)?" required value="<c:out value='${record.debit}' />">
        </div>
        <div class="form-group">
            <label>Có:</label>
            <input type="text" name="credit" pattern="[0-9]+(\.[0-9]+)?" required value="<c:out value='${record.credit}' />">
        </div>
        <div class="form-group">
            <label>Loại:</label>
            <select name="category">
                <c:forEach items="<%= AccountingTypes.values() %>" var="cat">
                    <option value="${cat}" ${cat == record.category ? 'selected' : ''}>
                            ${cat.getName()}
                    </option>
                </c:forEach>
            </select>
        </div>
        <div class="form-group">
            <label>Mô tả:</label>
            <input type="text" name="description" value="<c:out value='${record.description}' />">
        </div>
        <button type="submit">Lưu</button>
    </form>
    <a href="${pageContext.request.contextPath}/accounting/record">Quay lại danh sách</a>
</body>
</html>