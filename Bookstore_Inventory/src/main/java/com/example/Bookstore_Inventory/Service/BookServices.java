package com.example.Bookstore_Inventory.Service;


import com.example.Bookstore_Inventory.Entity.Book;
import com.example.Bookstore_Inventory.Repo.BookRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service    
public class BookServices {

    @Autowired
    private BookRepo repo;

    public void saveorUpdate(Book books) {

        repo.save(books)

    }
}
