package org.example.model;

import com.google.gson.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;
import java.util.Date;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Budget {
    @BsonId
    @BsonProperty("_id")
    private ObjectId id;

    private String name;
    private double expectedAmount;
    private double spentAmount;
    private Date createdAt;

    public static Gson BudgetBuilder() {
        return new GsonBuilder()
                .registerTypeAdapter(ObjectId.class, (JsonSerializer<ObjectId>) (src, typeOfSrc, context) ->
                        new JsonPrimitive(src.toHexString()))
                .registerTypeAdapter(Date.class, (JsonSerializer<Date>) (src, typeOfSrc, context) ->
                        new JsonPrimitive(src.getTime()))
                .create();
    }
}
