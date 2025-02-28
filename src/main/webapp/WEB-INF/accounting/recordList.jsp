<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page import="org.example.api.accounting.AccountingTypes" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %>



<html>
<head>
    <title>Accounting Records</title>
    <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid black; padding: 8px; text-align: left; }
        .form-group { margin: 10px 0; }
    </style>
</head>
<body>
<form action="accounting.jsp" method="post">
    <div class="form-group">
        <label>Name:</label>
        <input type="text" name="name" required>
    </div>
    <div class="form-group">
        <label>Description:</label>
        <input type="text" name="description">
    </div>
    <div class="form-group">
        <label>Debit:</label>
        <input type="number" name="debit" step="0.01" required>
    </div>
    <div class="form-group">
        <label>Credit:</label>
        <input type="number" name="credit" step="0.01" required>
    </div>
    <div class="form-group">
        <label>Category:</label>
        <select name="category">
            <c:forEach items="<%= AccountingTypes.values() %>" var="cat">
                <option value="${cat}">${cat.getName()}</option>
            </c:forEach>
        </select>
    </div>
    <div class="form-group">
        <label>Reference Date:</label>
        <input type="datetime-local" name="reference_date" required>
    </div>
    <button type="submit">Add Record</button>
</form>
<h3>Records List</h3>
<table>
    <tr>
        <th>ID</th>
        <th>Date</th>
        <th>Code</th>
        <th>Name</th>
        <th>Description</th>
        <th>Debit</th>
        <th>Credit</th>
        <th>Category</th>
        <th>Reference Date</th>
    </tr>
    <c:forEach items="${records}" var="record">
        <tr>
            <td>${record.id}</td>
<%--            <td><fmt:formatDate value="${record.date.getValue().toDate()}" pattern="yyyy-MM-dd HH:mm:ss" /></td>--%>
            <td>${record.date.getValue()}</td>
            <td>${record.code}</td>
            <td>${record.name}</td>
            <td>${record.description}</td>
            <td>${record.debit}</td>
            <td>${record.credit}</td>
            <td>${record.category.getName()}</td>


            <td>${record.reference_date.getValue()}</td>

        </tr>
    </c:forEach>
</table>
</body>
</html>
