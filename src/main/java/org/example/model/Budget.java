package org.example.model;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.google.gson.*;
import lombok.*;
import lombok.experimental.FieldDefaults;
import org.bson.codecs.pojo.annotations.BsonId;
import org.bson.codecs.pojo.annotations.BsonProperty;
import org.bson.types.ObjectId;
import org.example.api.budget.BudgetType;
import org.example.utils.ObjectIdDeserializer;

import java.util.Date;


@Data
@NoArgsConstructor
@Getter
@Setter
@AllArgsConstructor
@FieldDefaults(level = lombok.AccessLevel.PRIVATE)
public class Budget {
    @BsonId
    @BsonProperty("_id")
    ObjectId id;

    @JsonDeserialize(using = ObjectIdDeserializer.class)
    ObjectId user_id;

    String name;
    double expected_amount;
    double spent_amount;
    String budget_type;

    public static Gson BudgetBuilder() {
        return new GsonBuilder()
                .registerTypeAdapter(ObjectId.class, (JsonSerializer<ObjectId>) (src, typeOfSrc, context) ->
                        new JsonPrimitive(src.toHexString()))
                .registerTypeAdapter(Date.class, (JsonSerializer<Date>) (src, typeOfSrc, context) ->
                        new JsonPrimitive(src.getTime()))
                .create();
    }
}
