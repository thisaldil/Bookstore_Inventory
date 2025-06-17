package com.example.Bookstore_Inventory.Controller;

import com.example.Bookstore_Inventory.model.Book;
import com.example.Bookstore_Inventory.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    // Upload a new book with PDF
    @PostMapping
    public ResponseEntity<Book> createBook(@RequestBody Book book) {
        return ResponseEntity.ok(bookRepository.save(book));
    }


    // Get all books
    @GetMapping
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    // Delete a book by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable String id) {
        bookRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }

    // Get a book by ID
    @GetMapping("/{id}")
    public ResponseEntity<Book> getBookById(@PathVariable String id) {
        return bookRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Update a book, including optional PDF replacement
    @PutMapping("/{id}")
    public ResponseEntity<Book> updateBook(@PathVariable String id, @RequestBody Book updatedBook) {
        return bookRepository.findById(id)
                .map(existingBook -> {
                    existingBook.setTitle(updatedBook.getTitle());
                    existingBook.setAuthor(updatedBook.getAuthor());
                    existingBook.setDescription(updatedBook.getDescription());
                    existingBook.setCategory(updatedBook.getCategory());
                    existingBook.setAvailable(updatedBook.isAvailable());
                    existingBook.setCoverImageUrl(updatedBook.getCoverImageUrl());
                    existingBook.setPdfUrl(updatedBook.getPdfUrl());
                    existingBook.setPages(updatedBook.getPages());
                    existingBook.setPublished(updatedBook.getPublished());
                    return ResponseEntity.ok(bookRepository.save(existingBook));
                })
                .orElse(ResponseEntity.notFound().build());
    }

}