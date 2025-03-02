package org.example.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.gson.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.BsonDateTime;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;
import org.example.api.accounting.AccountingTypes;
import org.example.utils.DateTimeDeserializer;
import org.example.utils.ObjectIdDeserializer;

import java.io.Serializable;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AccountingRecord implements Serializable {
    @BsonProperty("_id")
    @BsonId
    private ObjectId id;

    @BsonProperty("user_id")
    @JsonDeserialize(using = ObjectIdDeserializer.class)
    private ObjectId user_id;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date date;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private Date reference_date;

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
                .registerTypeAdapter(Date.class, (JsonSerializer<Date>) (src, typeOfSrc, context) -> {
                    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
                    return new JsonPrimitive(dateFormat.format(src));
                })
                .registerTypeAdapter(AccountingTypes.class, (JsonSerializer<AccountingTypes>) (src, typeOfSrc, context) -> {
                    JsonObject obj = new JsonObject();
                    obj.addProperty("standardId", src.getStandardId());
                    obj.addProperty("name", src.getName());
                    obj.addProperty("equation", src.getEquation());
                    return obj;
                })
                .create();
    }

}
