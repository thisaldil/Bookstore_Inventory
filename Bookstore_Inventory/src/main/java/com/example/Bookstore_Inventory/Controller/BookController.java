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
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:3000")
public class BookController {

    @Autowired
    private BookRepository bookRepository;

    // Upload a new book with PDF
    @PostMapping("/upload")
    public ResponseEntity<Book> uploadBook(
            @RequestParam("pdf") MultipartFile file,
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("coverImageUrl") String coverImageUrl,
            @RequestParam("available") boolean available
    ) {
        String originalName = file.getOriginalFilename().replaceAll("[^a-zA-Z0-9.\\-]", "_");
        String filename = UUID.randomUUID() + "_" + originalName;

        Path path = Paths.get("uploads/" + filename);
        try {
            Files.createDirectories(path.getParent());
            Files.copy(file.getInputStream(), path);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }

        String pdfUrl = "http://localhost:8080/uploads/" + filename;
        Book book = new Book(title, author, description, category, coverImageUrl, available, pdfUrl);
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
    public ResponseEntity<Book> updateBook(
            @PathVariable String id,
            @RequestParam("title") String title,
            @RequestParam("author") String author,
            @RequestParam("description") String description,
            @RequestParam("category") String category,
            @RequestParam("available") boolean available,
            @RequestParam("coverImageUrl") String coverImageUrl,
            @RequestParam("pdfUrl") String existingPdfUrl,
            @RequestParam(value = "pdf", required = false) MultipartFile newPdfFile
    ) {
        return bookRepository.findById(id)
                .map(existingBook -> {
                    String pdfUrl = existingPdfUrl;

                    // Handle PDF file upload if provided
                    if (newPdfFile != null && !newPdfFile.isEmpty()) {
                        try {
                            String originalName = newPdfFile.getOriginalFilename().replaceAll("[^a-zA-Z0-9.\\-]", "_");
                            String filename = UUID.randomUUID() + "_" + originalName;
                            Path path = Paths.get("uploads/" + filename);
                            Files.createDirectories(path.getParent());
                            Files.copy(newPdfFile.getInputStream(), path);
                            pdfUrl = "http://localhost:8080/uploads/" + filename;
                        } catch (IOException e) {
                            throw new RuntimeException("File upload failed", e);
                        }
                    }

                    // Update book properties
                    existingBook.setTitle(title);
                    existingBook.setAuthor(author);
                    existingBook.setDescription(description);
                    existingBook.setCategory(category);
                    existingBook.setAvailable(available);
                    existingBook.setCoverImageUrl(coverImageUrl);
                    existingBook.setPdfUrl(pdfUrl);

                    return ResponseEntity.ok(bookRepository.save(existingBook));
                })
                .orElse(ResponseEntity.notFound().build());
    }
}