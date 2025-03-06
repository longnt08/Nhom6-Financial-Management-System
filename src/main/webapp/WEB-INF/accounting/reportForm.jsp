<%--
  Created by IntelliJ IDEA.
  User: huybop
  Date: 3/7/2025
  Time: 1:55 AM
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <title>Báo Cáo Tài Chính</title>
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
            width: 120px;
            font-weight: bold;
        }
        input {
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
        a {
            display: block;
            margin-top: 20px;
            color: #3498db;
            text-decoration: none;
        }
    </style>
</head>
<body>
<h2>
    <c:if test="${report != null}">
        Chỉnh sửa báo cáo
    </c:if>
    <c:if test="${report == null}">
        Tạo báo cáo mới
    </c:if>
</h2>

<c:if test="${report != null}">
<form action="${pageContext.request.contextPath}/accounting/report/update" method="post">
    <input type="text" name="id" value="<c:out value='${report.id}' />" hidden>
    </c:if>
    <c:if test="${report == null}">
    <form action="${pageContext.request.contextPath}/accounting/report/insert" method="post">
        </c:if>
        <div class="form-group">
            <label>Loại báo cáo:</label>
            <input type="text" name="reportType" value="<c:out value='${report.reportType}' />" required>
        </div>
        <div class="form-group">
            <label>Ngày bắt đầu:</label>
            <input type="datetime-local" name="startDate" value="<c:out value='${report.startDate}' />" required>
        </div>
        <div class="form-group">
            <label>Ngày kết thúc:</label>
            <input type="datetime-local" name="endDate" value="<c:out value='${report.endDate}' />" required>
        </div>
        <button type="submit">Lưu báo cáo</button>
    </form>
    <a href="${pageContext.request.contextPath}/accounting/report">Quay lại danh sách</a>
</body>
</html>