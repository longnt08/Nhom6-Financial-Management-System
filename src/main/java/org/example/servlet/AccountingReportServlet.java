package org.example.servlet;

import jakarta.ejb.EJB;
import jakarta.servlet.annotation.WebServlet;
import org.example.service.AccountingReportServiceLocal;

@WebServlet('/accounting/report/*')
public class AccountingReportServlet {
    @EJB
    private AccountingReportServiceLocal reportService;

}
