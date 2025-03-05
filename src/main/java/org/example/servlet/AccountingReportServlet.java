package org.example.servlet;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.model.AccountingReport;
import org.example.service.AccountingReportServiceLocal;

import java.io.IOException;


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
        }
//        else if (action.equals("/create")) {
//            req.getRequestDispatcher("/WEB-INF/accounting/reportForm.jsp").forward(req, resp);
//        }
//        else if (action.equals("/insert")) {
//            insertRecord(req, resp);
//        }
        else if (action.equals("/view")) {
            String id = req.getParameter("id");
            req.setAttribute("report", reportService.getById(id));
            req.getRequestDispatcher("/WEB-INF/accounting/reportView.jsp").forward(req, resp);
        }
    }

//
//    private void insertReport(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
//        try {
//            AccountingReport report = new AccountingReport();
//
////            report.setName(req.getParameter("name"));
////            report.setCode(req.getParameter("code"));
////            report.setDescription(req.getParameter("description"));
////
////            report.setDebit(Double.parseDouble(req.getParameter("debit")));
////            report.setCredit(Double.parseDouble(req.getParameter("credit")));
////
////            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
////            dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
////
////            report.setDate(dateFormat.parse(req.getParameter("date")));
////            report.setReference_date(Date.from(Instant.now()));
////
////            report.setCategory(AccountingTypes.valueOf(req.getParameter("category")));
//
//            AccountingReport result = reportService.create(report);
//
//            resp.sendRedirect(req.getContextPath() + "/accounting/report");
//        } catch (Exception e) {
//            req.setAttribute("error", "Error creating report: " + e.getMessage());
//            req.getRequestDispatcher("/WEB-INF/accounting/reportForm.jsp").forward(req, resp);
//        }
//    }
}
