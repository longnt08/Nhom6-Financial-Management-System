package org.example.servlet;

import jakarta.ejb.EJB;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.example.api.accounting.AccountingTypes;
import org.example.model.AccountingRecord;
import org.example.service.AccountingRecordServiceLocal;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.util.Date;
import java.util.TimeZone;

@WebServlet("/accounting/record/*")
public class AccountingServlet extends HttpServlet {
    @EJB
    private AccountingRecordServiceLocal recordService;

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        doGet(req, resp);
    }

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp)
            throws ServletException, IOException {
        String action = req.getPathInfo();


        if (action == null || action.equals("/")) {
            req.setAttribute("records", recordService.getAll());
            req.getRequestDispatcher("/WEB-INF/accounting/recordList.jsp").forward(req, resp);
        } else if (action.equals("/create")) {
            req.getRequestDispatcher("/WEB-INF/accounting/recordForm.jsp").forward(req, resp);
        } else if (action.equals("/insert")) {
            insertRecord(req, resp);
        } else if (action.equals("/edit")) {
            String id = req.getParameter("id");
            AccountingRecord record = recordService.get(id);
            req.setAttribute("record", record);
            req.getRequestDispatcher("/WEB-INF/accounting/recordForm.jsp").forward(req, resp);
        } else if (action.equals("/update")) {
            editRecord(req, resp);
        }
        else if (action.equals("/view")) {
            String id = req.getParameter("id");
            req.setAttribute("record", recordService.get(id));
            req.getRequestDispatcher("/WEB-INF/accounting/recordView.jsp").forward(req, resp);
        }
    }

    private void editRecord(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            String id = req.getParameter("id");
            if (id == null || id.isEmpty()) {
                throw new Exception("Record ID is required");
            }

            AccountingRecord record = recordService.get(id);

            record.setDescription(req.getParameter("description"));

            record.setDebit(Double.parseDouble(req.getParameter("debit")));
            record.setCredit(Double.parseDouble(req.getParameter("credit")));

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
            dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

            record.setDate(dateFormat.parse(req.getParameter("date")));
//            record.setReference_date(Date.from(Instant.now()));

            record.setCategory(AccountingTypes.valueOf(req.getParameter("category")));

            AccountingRecord result = recordService.updateRecord(id, record);
            System.out.println(result);

            resp.sendRedirect(req.getContextPath() + "/accounting/record");
        } catch (Exception e) {
            req.setAttribute("error", "Error changing record info: " + e.getMessage());
            req.getRequestDispatcher("/WEB-INF/accounting/recordForm.jsp").forward(req, resp);
        }
    }
    private void insertRecord(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        try {
            AccountingRecord record = new AccountingRecord();

            record.setName(req.getParameter("name"));
            record.setCode(req.getParameter("code"));
            record.setDescription(req.getParameter("description"));

            record.setDebit(Double.parseDouble(req.getParameter("debit")));
            record.setCredit(Double.parseDouble(req.getParameter("credit")));

            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm");
            dateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));

            record.setDate(dateFormat.parse(req.getParameter("date")));
            record.setReference_date(Date.from(Instant.now()));

            record.setCategory(AccountingTypes.valueOf(req.getParameter("category")));

            AccountingRecord result = recordService.addRecord(record);
            System.out.println(result);

            resp.sendRedirect(req.getContextPath() + "/accounting/record");
        } catch (Exception e) {
            req.setAttribute("error", "Error creating record: " + e.getMessage());
            req.getRequestDispatcher("/WEB-INF/accounting/recordForm.jsp").forward(req, resp);
        }
    }
}
