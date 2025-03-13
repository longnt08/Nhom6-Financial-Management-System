package org.example.servlet;

import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.ejb.EJB;

import org.example.service.UserService;
import org.example.model.User;

@WebServlet("/user/login")
public class UserLoginServlet extends HttpServlet {
    @EJB
    private UserService userService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        // Chuyển hướng đến trang JSP đăng ký
        req.getRequestDispatcher("/WEB-INF/user/login.jsp").forward(req, resp);
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String username = req.getParameter("username");
        String password = req.getParameter("password");

        User user = userService.authenticate(username, password);
        if (user != null) {
            HttpSession session = req.getSession();
            session.setAttribute("user", user);
            resp.sendRedirect("http://localhost:8080/FinancialManagement/homepage");
        } else {
            req.setAttribute("error", "Sai tài khoản hoặc mật khẩu.");
            req.getRequestDispatcher("/WEB-INF/user/login.jsp").forward(req, resp);
        }
    }
}

