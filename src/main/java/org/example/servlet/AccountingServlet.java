package org.example.servlet;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.service.AccountingRecordServiceLocal;
import org.example.service.AccountingReportServiceLocal;

import java.io.IOException;
import java.util.Date;

@WebServlet("/accounting/*")
public class AccountingServlet extends HttpServlet {
    @EJB
    private AccountingRecordServiceLocal recordService;
    @EJB
    private AccountingReportServiceLocal reportService;

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String action = req.getPathInfo();

        if (action == null || action.equals("/")) {
            req.setAttribute("records", recordService.getAll());
            req.getRequestDispatcher("/WEB-INF/accounting/recordList.jsp").forward(req, resp);
        } else if (action.equals("/view")) {
            String id = req.getParameter("id");
            req.setAttribute("record", recordService.get(id));
            req.getRequestDispatcher("/WEB-INF/accounting/recordView.jsp").forward(req, resp);
        }
    }
}
//@WebServlet("/accounting/*")
//public class AccountingServlet extends HttpServlet {
//    @EJB
//    private AccountingReportServiceLocal accountingService;
//
//    @Override
//    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
//            throws ServletException, IOException {
//        String action = req.getPathInfo();
//
//        if (action == null || action.equals("/")) {
//            req.setAttribute("records", accountingService.getAll());
//            req.getRequestDispatcher("/accounting.jsp").forward(req, resp);
//        } else if (action.equals("/edit")) {
//            String id = req.getParameter("id");
//            req.setAttribute("record", accountingService.getById(id));
//            req.getRequestDispatcher("/accounting-edit.jsp").forward(req, resp);
//        }
//    }

//    @Override
//    protected void doPost(HttpServletRequest req, HttpServletResponse resp)
//            throws ServletException, IOException {
//        String action = req.getPathInfo();
//
//        if (action == null || action.equals("/create")) {
//            AccountingReport report = new AccountingReport();
//            populateReport(report, req);
//            accountingService.create(report);
//        } else if (action.equals("/update")) {
//            String id = req.getParameter("id");
//            AccountingReport report = accountingService.getById(id);
//            populateReport(report, req);
//            // Assuming you add update method to service
//            accountingService.update(id, report);
//        } else if (action.equals("/delete")) {
//            String id = req.getParameter("id");
//            // Assuming you add delete method to service
//            accountingService.delete(id);
//        }
//
//        resp.sendRedirect(req.getContextPath() + "/accounting");
//    }
//
//    private void populateReport(AccountingReport report, HttpServletRequest req) {
//        report.setName(req.getParameter("name"));
//        report.setDescription(req.getParameter("description"));
//        // Add other fields based on your AccountingReport class
//        report.setCreatedAt(new Date());
//    }
//}
