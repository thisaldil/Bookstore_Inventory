package com.example.Bookstore_Inventory.Repo;

import com.example.Bookstore_Inventory.Entity.Book;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BookRepo extends MongoRepository<Book,String> {
}
