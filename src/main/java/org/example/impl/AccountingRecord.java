package org.example.impl;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.BsonDateTime;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;
import org.example.api.JsonParsable;
import org.example.api.accounting.AccountingTypes;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountingRecord {
    @BsonProperty("_id")
    @BsonId
    private ObjectId id;
    @BsonProperty("user_id")
    private ObjectId user_id;



    private BsonDateTime date;
//    private BsonDateTime reference_date;
    private double debit;
    private double credit;
    private String description;
//    private AccountingTypes category;

}
