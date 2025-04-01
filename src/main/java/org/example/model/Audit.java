package org.example.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;
import org.example.api.audit.AuditCategory;
import org.example.api.audit.AuditStatusTypes;
import org.example.utils.DateTimeDeserializer;
import org.example.utils.ObjectIdDeserializer;
import org.example.utils.ObjectIdListDeserializer;

import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Audit {
    @BsonProperty("_id")
    @BsonId
    private ObjectId id;

    private String title;

    @BsonProperty("user_id")
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId userId;

    @BsonProperty("audit_type")
    private AuditCategory auditType;

    @BsonProperty("date_audited")
    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date auditDate;

    private AuditStatusTypes result;

    @BsonProperty("reports_id")
    @JsonDeserialize(using = ObjectIdListDeserializer.class)
    private List<ObjectId> reportsId;

    @BsonProperty("records_id")
    @JsonDeserialize(using = ObjectIdListDeserializer.class)
    private List<ObjectId> recordsId;

}