package org.example.servlet;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.bson.types.ObjectId;
import org.example.model.AccountingReport;
import org.example.service.AccountingReportServiceLocal;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.TimeZone;

@WebServlet("/accounting/report/*")
public class AccountingReportServlet extends HttpServlet {
    @EJB
    private AccountingReportServiceLocal reportService;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String action = req.getPathInfo();

        if (action == null || action.equals("/")) {
            req.setAttribute("reports", reportService.getAll());
            req.getRequestDispatcher("/WEB-INF/accounting/reportList.jsp").forward(req, resp);
        } else if (action.equals("/create")) {
            req.getRequestDispatcher("/WEB-INF/accounting/reportForm.jsp").forward(req, resp);
        } else if (action.equals("/insert")) {
            insertReport(req, resp);
        } else if (action.equals("/edit")) {
            String id = req.getParameter("id");
            AccountingReport report = reportService.getById(id);
            req.setAttribute("report", report);
            req.getRequestDispatcher("/WEB-INF/accounting/reportForm.jsp").forward(req, resp);
        } else if (action.equals("/update")) {
            updateReport(req, resp);
        } else if (action.equals("/view")) {
            String id = req.getParameter("id");
            req.setAttribute("report", reportService.getById(id));
            req.getRequestDispatcher("/WEB-INF/accounting/reportView.jsp").forward(req, resp);
        }
    }

    private void insertReport(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");
            AccountingReport report = new AccountingReport();

            report.setReportType(req.getParameter("reportType"));

            // Get current user ID from session or use a default for now
            // In a real application, you'd get this from the authenticated user
            report.setUser_id(new ObjectId());

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
            dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

            report.setStartDate(dateFormat.parse(req.getParameter("startDate")));
            report.setEndDate(dateFormat.parse(req.getParameter("endDate")));
            report.setDate_created(Date.from(Instant.now()));

            AccountingReport result = reportService.createReport(report);
            System.out.println("Created report: " + result);

            resp.sendRedirect(req.getContextPath() + "/accounting/report");
        } catch (Exception e) {
            req.setAttribute("error", "Error creating report: " + e.getMessage());
            req.getRequestDispatcher("/WEB-INF/accounting/reportForm.jsp").forward(req, resp);
        }
    }

    private void updateReport(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            req.setCharacterEncoding("UTF-8");
            String id = req.getParameter("id");

            if (id == null || id.isEmpty()) {
                throw new RuntimeException("Report ID is required");
            }

            AccountingReport report = reportService.getById(id);

            report.setReportType(req.getParameter("reportType"));

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
            dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

            report.setStartDate(dateFormat.parse(req.getParameter("startDate")));
            report.setEndDate(dateFormat.parse(req.getParameter("endDate")));

            AccountingReport result = reportService.updateReport(id, report);
            System.out.println("Updated report: " + result);

            resp.sendRedirect(req.getContextPath() + "/accounting/report");
        } catch (Exception e) {
            req.setAttribute("error", "Error updating report: " + e.getMessage());
            req.getRequestDispatcher("/WEB-INF/accounting/reportForm.jsp").forward(req, resp);
        }
    }
}