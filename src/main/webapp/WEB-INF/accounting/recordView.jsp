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
    <title>Record Details</title>
</head>
<body>
<h2>Report Details</h2>
<div>
    <p>ID: ${report.id}</p>
    <p>Date: ${report.createdAt}</p>
    <!-- Add more report fields here -->
</div>
<a href="${pageContext.request.contextPath}/accounting/">Back to List</a>
</body>
</html>
