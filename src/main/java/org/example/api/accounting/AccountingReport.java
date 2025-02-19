package org.example.api.accounting;

import com.google.gson.JsonObject;
import org.example.api.audit.AuditStatusTypes;

import java.util.Date;
import java.util.List;

public abstract class AccountingReport {
    private String tenBaoCao;
    private Date ngayBaoCao;
    private Date thoiGianBatDau;
    private Date thoiGianKetThuc;
//    private List<AccountingRecord> danhSachChungTu;
    private AuditStatusTypes TrangThai;


    abstract public JsonObject createNewReport();

    abstract public JsonObject getReport(String id);

    abstract public List<JsonObject> getAllReports();

    abstract public boolean KiemToan();


}
