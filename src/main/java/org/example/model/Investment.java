package org.example.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.JsonPrimitive;
import com.google.gson.JsonSerializer;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.BsonDateTime;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;
import org.example.utils.DateTimeDeserializer;

import java.io.Serializable;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Investment implements Serializable {
    @BsonProperty("_id")
    @BsonId
    private ObjectId id;

    @BsonProperty("user_id")
    private ObjectId userId;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private BsonDateTime investDate;

    @JsonDeserialize(using = DateTimeDeserializer.class)
    private BsonDateTime endDate;

    private String investmentType;
    private double investedAmount;
    private double expectedReturnRate;

    public static Gson InvestmentBuilder() {
        return new GsonBuilder()
                .registerTypeAdapter(ObjectId.class, (JsonSerializer<ObjectId>) (src, typeOfSrc, context) ->
                        new JsonPrimitive(src.toHexString()))
                .registerTypeAdapter(BsonDateTime.class, (JsonSerializer<BsonDateTime>) (src, typeOfSrc, context) ->
                        new JsonPrimitive(new Date(src.getValue()).toString()))
                .create();
    }
}  
