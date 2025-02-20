package org.example.impl;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.gson.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.BsonDateTime;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;
import org.example.api.JsonParsable;
import org.example.api.accounting.AccountingTypes;
import org.example.utils.DateTimeDeserializer;
import org.example.utils.ObjectIdDeserializer;

import java.lang.reflect.Type;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountingRecord {
    @BsonProperty("_id")
    @BsonId
    private ObjectId id;

    @BsonProperty("user_id")
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId user_id;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private BsonDateTime date;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private BsonDateTime reference_date;

    private String code;
    private String name;
    private double debit;
    private double credit;
    private String description;
    private AccountingTypes category;

    public static Gson RecordBuilder() {
        return new GsonBuilder()
                .registerTypeAdapter(ObjectId.class, new JsonSerializer<ObjectId>() {
                    @Override
                    public JsonElement serialize(ObjectId src, Type typeOfSrc, JsonSerializationContext context) {
                        return new JsonPrimitive(src.toHexString());
                    }
                })
                .registerTypeAdapter(BsonDateTime.class, new JsonSerializer<BsonDateTime>() {
                    @Override
                    public JsonElement serialize(BsonDateTime src, Type typeOfSrc, JsonSerializationContext context) {
                        Date date = new Date(src.getValue());
                        return new JsonPrimitive(date.toString());
                    }
                })
                .registerTypeAdapter(AccountingTypes.class, new JsonSerializer<AccountingTypes>() {
                    @Override
                    public JsonElement serialize(AccountingTypes src, Type typeOfSrc, JsonSerializationContext context) {
                        JsonObject obj = new JsonObject();
                        obj.addProperty("standardId", src.getStandardId());
                        obj.addProperty("name", src.getName());
                        obj.addProperty("equation", src.getEquation());
                        return obj;
                    }
                })
                .create();
    }

}
