package com.example.Bookstore_Inventory.Entity;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "books")
public class Book {

    @Id
    private String id;
    private String bookname;
    private String bookauther;
    private String booknumber;


    public Book(String id, String bookname, String bookauther, String booknumber) {
        this.id = id;
        this.bookname = bookname;
        this.bookauther = bookauther;
        this.booknumber = booknumber;
    }

    public Book() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBookname() {
        return bookname;
    }

    public void setBookname(String bookname) {
        this.bookname = bookname;
    }

    public String getBookauther() {
        return bookauther;
    }

    public void setBookauther(String bookauther) {
        this.bookauther = bookauther;
    }

    public String getBooknumber() {
        return booknumber;
    }

    public void setBooknumber(String booknumber) {
        this.booknumber = booknumber;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id='" + id + '\'' +
                ", bookname='" + bookname + '\'' +
                ", bookauther='" + bookauther + '\'' +
                ", booknumber='" + booknumber + '\'' +
                '}';
    }
}
