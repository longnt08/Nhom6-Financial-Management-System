package org.example.servlet;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.model.Budget;
import org.example.service.BudgetServiceLocal;

import java.io.IOException;
import java.time.Instant;
import java.util.Date;


@WebServlet("/budget/*")
public class BudgetServlet extends HttpServlet {

    @EJB
    private BudgetServiceLocal budgetService;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String action = req.getPathInfo();

        if (action == null || action.equals("/")) {
            req.setAttribute("budgets", budgetService.getAll());
            req.getRequestDispatcher("/WEB-INF/budget/budgetList.jsp").forward(req, resp);

        } else if (action.equals("/create")) {
            req.getRequestDispatcher("/WEB-INF/budget/budgetForm.jsp").forward(req, resp);

        } else if (action.equals("/insert")) {
            insertBudget(req, resp);

        } else if (action.equals("/edit")) {
            String id = req.getParameter("id");
            Budget budget = budgetService.get(id);
            req.setAttribute("budget", budget);
            req.getRequestDispatcher("/WEB-INF/budget/budgetForm.jsp").forward(req, resp);

        } else if (action.equals("/update")) {
            updateBudget(req, resp);

        } else if (action.equals("/view")) {
            String id = req.getParameter("id");
            Budget budget = budgetService.get(id);
            req.setAttribute("budget", budget);
            req.getRequestDispatcher("/WEB-INF/budget/budgetView.jsp").forward(req, resp);
        }
    }

    private void insertBudget(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");

            Budget budget = new Budget();
            budget.setName(req.getParameter("name"));
            budget.setExpected_amount(Double.parseDouble(req.getParameter("expectedAmount")));
            budget.setSpent_amount(Double.parseDouble(req.getParameter("spentAmount")));


            Budget result = budgetService.addBudget(budget);
            System.out.println(result);

            resp.sendRedirect(req.getContextPath() + "/budget");
        } catch (Exception e) {
            req.setAttribute("error", "Error creating budget: " + e.getMessage());
            req.getRequestDispatcher("/WEB-INF/budget/budgetForm.jsp").forward(req, resp);
        }
    }

    private void updateBudget(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");
            String id = req.getParameter("id");

            Budget existing = budgetService.get(id);
            if (existing == null) {
                throw new RuntimeException("Budget not found for ID: " + id);
            }

            existing.setName(req.getParameter("name"));
            existing.setExpected_amount(Double.parseDouble(req.getParameter("expectedAmount")));
            existing.setSpent_amount(Double.parseDouble(req.getParameter("spentAmount")));

            Budget result = budgetService.updateBudget(id, existing);
            System.out.println(result);

            resp.sendRedirect(req.getContextPath() + "/budget");
        } catch (Exception e) {
            req.setAttribute("error", "Error updating budget: " + e.getMessage());
            req.getRequestDispatcher("/WEB-INF/budget/budgetForm.jsp").forward(req, resp);
        }
    }
}

