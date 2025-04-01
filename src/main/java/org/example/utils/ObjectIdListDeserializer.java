package org.example.utils;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.JsonToken;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.bson.types.ObjectId;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ObjectIdListDeserializer extends JsonDeserializer<List<ObjectId>> {
    @Override
    public List<ObjectId> deserialize(JsonParser p, DeserializationContext ctxt)
            throws IOException, JsonProcessingException {
        if (p.currentToken() != JsonToken.START_ARRAY) {
            throw new IOException("Expected JSON array");
        }

        List<ObjectId> result = new ArrayList<>();
        ObjectMapper mapper = (ObjectMapper) p.getCodec();
        List<String> stringIds = mapper.readValue(p, new TypeReference<List<String>>() {});

        for (String id : stringIds) {
            if (id != null && !id.isEmpty()) {
                result.add(new ObjectId(id));
            }
        }

        return result;
    }
}