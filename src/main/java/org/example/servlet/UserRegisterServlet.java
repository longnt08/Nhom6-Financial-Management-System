package org.example.servlet;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.ejb.EJB;

import org.example.service.UserService;

@WebServlet("/user/register")
public class UserRegisterServlet extends HttpServlet {
    @EJB
    private UserService userService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Chuyển hướng đến trang JSP đăng ký
        req.getRequestDispatcher("/WEB-INF/user/register.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");
        String email = req.getParameter("email");
        String role = req.getParameter("role");

        if (username.isEmpty() || password.isEmpty() || email.isEmpty() || role.isEmpty()) {
            req.setAttribute("error", "Vui lòng nhập đầy đủ thông tin.");
            req.getRequestDispatcher("/WEB-INF/user/register.jsp").forward(req, resp);
            return;
        }

        boolean success = userService.checkRegister(username, password, email, role);
        if (success) {
            userService.register(username, password, email, role);
            resp.sendRedirect("http://localhost:8080/FinancialManagement/user/login");
        } else {
            req.setAttribute("error", "Tài khoản đã tồn tại!");
            req.getRequestDispatcher("/WEB-INF/user/register.jsp").forward(req, resp);
        }
    }
}

