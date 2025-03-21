package org.example.servlet;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.model.Investment;
import org.example.service.InvestmentServiceLocal;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@WebServlet("/investment/*")
public class InvestmentServlet extends HttpServlet {

    @EJB
    private InvestmentServiceLocal investmentService;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        doGet(req, resp); // delegate to doGet for simplicity
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {

        String action = req.getPathInfo();

        if (action == null || action.equals("/")) {
            req.setAttribute("investments", investmentService.getAll());
            req.getRequestDispatcher("/WEB-INF/investment/investmentList.jsp").forward(req, resp);
        } else if (action.equals("/create")) {
            req.getRequestDispatcher("/WEB-INF/investment/investmentForm.jsp").forward(req, resp);
        } else if (action.equals("/insert")) {
            insertInvestment(req, resp);
        } else if (action.equals("/edit")) {
            String id = req.getParameter("id");
            Investment investment = investmentService.get(id);
            req.setAttribute("investment", investment);
            req.getRequestDispatcher("/WEB-INF/investment/investmentForm.jsp").forward(req, resp);
        } else if (action.equals("/update")) {
            updateInvestment(req, resp);
        } else if (action.equals("/view")) {
            String id = req.getParameter("id");
            Investment investment = investmentService.get(id);
            req.setAttribute("investment", investment);
            req.getRequestDispatcher("/WEB-INF/investment/investmentView.jsp").forward(req, resp);
        } else if (action.equals("/delete")) {
            deleteInvestment(req, resp);
        }
    }

    private void insertInvestment(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");
            Investment investment = new Investment();

            investment.setUserId(new org.bson.types.ObjectId(req.getParameter("user_id")));
            investment.setInvestmentType(req.getParameter("investmentType"));
            investment.setInvestedAmount(Double.parseDouble(req.getParameter("investedAmount")));
            investment.setExpectedReturnRate(Double.parseDouble(req.getParameter("expectedReturnRate")));

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

            Date investDate = sdf.parse(req.getParameter("investDate"));
            Date endDate = sdf.parse(req.getParameter("endDate"));

            investment.setInvestDate(new org.bson.BsonDateTime(investDate.getTime()));
            investment.setEndDate(new org.bson.BsonDateTime(endDate.getTime()));

            investmentService.addInvestment(investment);

            resp.sendRedirect(req.getContextPath() + "/investment");
        } catch (Exception e) {
            req.setAttribute("error", "Error creating investment: " + e.getMessage());
            req.getRequestDispatcher("/WEB-INF/investment/investmentForm.jsp").forward(req, resp);
        }
    }

    private void updateInvestment(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");
            String id = req.getParameter("id");

            if (id == null || id.isEmpty()) {
                throw new IllegalArgumentException("Investment ID is required");
            }

            Investment investment = investmentService.get(id);

            investment.setInvestmentType(req.getParameter("investmentType"));
            investment.setInvestedAmount(Double.parseDouble(req.getParameter("investedAmount")));
            investment.setExpectedReturnRate(Double.parseDouble(req.getParameter("expectedReturnRate")));

            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            sdf.setTimeZone(TimeZone.getTimeZone("UTC"));

            Date investDate = sdf.parse(req.getParameter("investDate"));
            Date endDate = sdf.parse(req.getParameter("endDate"));

            investment.setInvestDate(new org.bson.BsonDateTime(investDate.getTime()));
            investment.setEndDate(new org.bson.BsonDateTime(endDate.getTime()));

            investmentService.updateInvestment(id, investment);

            resp.sendRedirect(req.getContextPath() + "/investment");
        } catch (Exception e) {
            req.setAttribute("error", "Error updating investment: " + e.getMessage());
            req.getRequestDispatcher("/WEB-INF/investment/investmentForm.jsp").forward(req, resp);
        }
    }

    private void deleteInvestment(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        try {
            String id = req.getParameter("id");

            if (id == null || id.isEmpty()) {
                throw new IllegalArgumentException("Investment ID is required for deletion");
            }

            investmentService.deleteInvestment(id);

            resp.sendRedirect(req.getContextPath() + "/investment");
        } catch (Exception e) {
            req.setAttribute("error", "Error deleting investment: " + e.getMessage());
            req.getRequestDispatcher("/WEB-INF/investment/investmentList.jsp").forward(req, resp);
        }
    }
}

