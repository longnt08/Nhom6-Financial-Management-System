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
    <title></title>
    <style>
        .form-group {
            margin: 10px 0;
        }
    </style>
</head>
<body>
    <h2>
        <c:if test="${record != null}">
            Edit Accounting Record
        </c:if>
        <c:if test="${record == null}">
            Add Accounting Record
        </c:if>
        <c:if test="${error != null}">
            <span style="color: red">${error}</span>
        </c:if>
    </h2>

    <c:if test="${record != null}">
    <form action="${pageContext.request.contextPath}/accounting/record/update" method="post">
        </c:if>
        <c:if test="${record == null}">
        <form action="${pageContext.request.contextPath}/accounting/record/insert" method="post">
            </c:if>

            <div class="form-group">
                <label>Name:</label>
                <input type="text" name="name" value="<c:out value='${record.name}' />" required>
            </div>
            <div class="form-group">
                <label>Code:</label>
                <input type="text" name="code" value="<c:out value='${record.code}' />" required>
            </div>
            <div class="form-group">
                <label>Date:</label>
                <input type="datetime-local" name="date" value="<c:out value='${record.date}' />" required>
            </div>

            <div class="form-group">
                <label>Debit:</label>
                <input type="number" name="debit" step="0.01" required value="<c:out value='${record.debit}' />">
            </div>
            <div class="form-group">
                <label>Credit:</label>
                <input type="number" name="credit" step="0.01" required value="<c:out value='${record.credit}' />">
            </div>
                <div class="form-group">
                    <label>Category:</label>
                    <select name="category">
                        <c:forEach items="<%= AccountingTypes.values() %>" var="cat">
                            <option value="${cat}" ${cat == record.category ? 'selected' : ''}>
                                    ${cat.getName()}
                            </option>
                        </c:forEach>
                    </select>
                </div>
<%--            <div class="form-group">--%>
<%--                <label>Reference Date:</label>--%>
<%--                <input type="datetime-local" name="reference_date" required value="<c:out value='${record.reference_date}' />">--%>
<%--            </div>--%>
            <div class="form-group">
                <label>Description:</label>
                <input type="text" name="description" value="<c:out value='${record.description}' />">
            </div>
            <button type="submit" class="btn btn-success">Save</button>

        </form>

</body>
</html>
