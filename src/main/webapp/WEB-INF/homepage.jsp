
<%@ page contentType="text/html; charset=UTF-8" %>
<%@ page import="org.example.model.User" %>
<%@ page import="jakarta.servlet.http.HttpSession" %>

<%
  HttpSession sessionUser = request.getSession(false);
  User user = (User) sessionUser.getAttribute("user");
  if (user == null) {
    response.sendRedirect("/WEB-INF/user/login");
    return;
  }
%>

<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trang chủ</title>

  <!-- 🔥 Thêm Bootstrap để làm đẹp -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <style>
    body {
      background-color: #f4f4f4;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      background: white;
      padding: 20px;
      margin-top: 50px;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      text-align: center;
    }
    h2 {
      color: #007bff;
    }
    .btn-custom {
      width: 100%;
      margin: 10px 0;
    }
  </style>
</head>
<body>

<div class="container">
  <h2>Chào mừng, <%= user.getUsername() %>!</h2>
  <p>Hãy chọn hành động bên dưới:</p>

  <a href="${pageContext.request.contextPath}/accounting/record" class="btn btn-primary btn-custom">
    📖 Xem ghi chép kế toán
  </a>

  <a href="${pageContext.request.contextPath}/accounting/report" class="btn btn-success btn-custom">
    📊 Xem báo cáo kế toán
  </a>

  <a href="${pageContext.request.contextPath}/user/login" class="btn btn-danger btn-custom">
    🚪 Đăng xuất
  </a>
</div>

</body>
</html>
