package com.example.Bookstore_Inventory.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDate;

@Document(collection = "books")
public class Book {

    @Id
    private String id;

    private String title;
    private String author;
    private String description;
    private String category;
    private String coverImageUrl;
    private boolean available;
    private String pdfUrl;
    private int pages;
    private LocalDate published;

    public Book() {}

    public Book(String title, String author, String description, String category,
                String coverImageUrl, boolean available, String pdfUrl,
                int pages, LocalDate published) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.category = category;
        this.coverImageUrl = coverImageUrl;
        this.available = available;
        this.pdfUrl = pdfUrl;
        this.pages = pages;
        this.published = published;
    }


    // getters and setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getAuthor() { return author; }
    public void setAuthor(String author) { this.author = author; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getCoverImageUrl() { return coverImageUrl; }
    public void setCoverImageUrl(String coverImageUrl) { this.coverImageUrl = coverImageUrl; }

    public boolean isAvailable() { return available; }
    public void setAvailable(boolean available) { this.available = available; }

    public String getPdfUrl() { return pdfUrl; }
    public void setPdfUrl(String pdfUrl) { this.pdfUrl = pdfUrl; }

    public int getPages() { return pages; }
    public void setPages(int pages) { this.pages = pages; }

    public LocalDate getPublished() { return published; }
    public void setPublished(LocalDate published) { this.published = published; }
}
