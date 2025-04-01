package com.example.Bookstore_Inventory.Controller;


import com.example.Bookstore_Inventory.Entity.Book;
import com.example.Bookstore_Inventory.Service.BookServices;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*" )
@RequestMapping("api/v1/book")
public class BookController {

    @Autowired
    private BookServices bookServices;
    @PostMapping(value = "/save")
    private String saveBook(@RequestBody Book books){


        bookServices.saveorUpdate(books);



        return books.id;
    }
}
