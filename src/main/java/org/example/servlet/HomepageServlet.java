package org.example.servlet;


import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.example.model.User;
import org.example.service.UserService;

import java.io.IOException;

@WebServlet("/homepage")
public class HomepageServlet extends HttpServlet {
    @EJB
    private UserService userService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        HttpSession session = req.getSession(false);

        if (session == null || session.getAttribute("user") == null) {
            resp.sendRedirect("http://localhost:8080/FinancialManagement/user/login"); // Nếu chưa đăng nhập, chuyển về login
            return;
        }

        User user = (User) session.getAttribute("user");

        req.getRequestDispatcher("/WEB-INF/homepage.jsp").forward(req, resp);
    }
}

