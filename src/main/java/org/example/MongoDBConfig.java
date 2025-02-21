package org.example;

import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoDatabase;
import jakarta.ejb.Singleton;
import lombok.Getter;
import lombok.Setter;
import org.bson.codecs.configuration.CodecRegistries;
import org.bson.codecs.configuration.CodecRegistry;
import org.bson.codecs.pojo.PojoCodecProvider;

@Singleton
public class MongoDBConfig {
    private static MongoClient mongoClient ;
//            = MongoClients.create("mongodb+srv://diepanhnguyen2807:nhom6@cluster0.d9lbu.mongodb.net/");
    @Getter
    @Setter
    private static MongoDatabase database ;
//        = mongoClient.getDatabase("financial_management");
    static {
        CodecRegistry pojoCodecRegistry = CodecRegistries.fromRegistries(
                MongoClientSettings.getDefaultCodecRegistry(),
                CodecRegistries.fromProviders(PojoCodecProvider.builder().automatic(true).build())
        );

        mongoClient = MongoClients.create("mongodb+srv://diepanhnguyen2807:nhom6@cluster0.d9lbu.mongodb.net/");
        database = mongoClient.getDatabase("financial_management;").withCodecRegistry(pojoCodecRegistry);
    }

}

