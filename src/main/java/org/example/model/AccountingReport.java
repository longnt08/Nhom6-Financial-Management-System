package org.example.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.BsonDateTime;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;
import org.example.utils.DateTimeDeserializer;
import org.example.utils.ObjectIdDeserializer;

import java.io.Serializable;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountingReport implements Serializable {

    @BsonProperty("_id")
    @BsonId
    private ObjectId id;

    @BsonProperty("user_id")
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId user_id;

    private String report_type;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private BsonDateTime date_created;

    private List<ReportContent> content;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ReportContent {
        private String category;

        private double amount;
    }

}
