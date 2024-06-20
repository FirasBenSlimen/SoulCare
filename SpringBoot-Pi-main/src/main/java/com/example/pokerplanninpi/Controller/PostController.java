package com.example.pokerplanninpi.Controller;

import com.example.pokerplanninpi.GlobalService.PostService;
import com.example.pokerplanninpi.entity.Post;
import com.example.pokerplanninpi.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@CrossOrigin(origins = "*" )
@RequestMapping("/posts")
public class PostController {
    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/retrieve-all-posts")
    public List<Post> getAllPosts() {
        return postService.getAllPosts();
    }

    @GetMapping("/retrieve-post/{id}")
    public Post getPostById(@PathVariable("id") Long id) {
        return postService.getPostById(id);
    }


    @PostMapping(path="/add-post",consumes = "multipart/form-data")
    public Post createPost(@RequestPart("jsonData") String jsonData,
                           @RequestPart("image") MultipartFile image) throws IOException, SQLException {
        // Deserialize JSON string into Post object
        ObjectMapper objectMapper = new ObjectMapper();
        Post post = objectMapper.readValue(jsonData, Post.class);
        post.setDatePosted(LocalDateTime.now());
        // Process the image file
        byte[] fileBytes = image.getBytes();
        Blob blob = new SerialBlob(fileBytes);

        // Set the image in the Post object
        post.setImage(blob);

        // Save or update the post
        return postService.saveOrUpdatePost(post);
    }


    @PutMapping(path="/modify-post/{id}",consumes = "multipart/form-data")
    public Post updatePost(@PathVariable Long id,
                           @RequestPart("jsonData") String jsonData,
                           @RequestPart("image") MultipartFile image) throws IOException, SQLException {
        ObjectMapper objectMapper = new ObjectMapper();
        Post post = objectMapper.readValue(jsonData, Post.class);

        post.setId(id);

        byte[] fileBytes = image.getBytes();
        Blob blob = new SerialBlob(fileBytes);

        post.setImage(blob);

        post.setDatePosted(LocalDateTime.now());


        return postService.saveOrUpdatePost(post);
    }

    @DeleteMapping("/remove-post/{id}")
    public void deletePost(@PathVariable Long id) {
        postService.deletePost(id);
    }

    @PostMapping("/upload-image")
    public String uploadImage(@RequestParam("file") MultipartFile file) throws IOException {
        return postService.saveImage(file);
    }

    @GetMapping("/search-posts")
    List<Post> searchPost(@RequestParam(value = "keyword") String keyword) {
        List<Post> allReclamations = postService.getAllPosts();
        return allReclamations.stream()
                .filter(story ->
                        story.getAuthor().toLowerCase().contains(keyword.toLowerCase()) ||
                                story.getContent().toLowerCase().contains(keyword.toLowerCase()))
                .collect(Collectors.toList());
    }

    // WITH COMMENTS HERE ******************************************************

    @GetMapping("/retrieve-post-with-comments/{id}")
    public ResponseEntity<Post> getPostWithComments(@PathVariable("id") Long id) {
        Post post = postService.getPostByIdWithComments(id);
        if (post != null) {
            return new ResponseEntity<>(post, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Handle case where post with given ID is not found
        }
    }







}
