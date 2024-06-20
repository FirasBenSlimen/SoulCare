package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.Repository.CommentRepository;
import com.example.pokerplanninpi.Repository.PostRepository;
import com.example.pokerplanninpi.entity.Comment;
import com.example.pokerplanninpi.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.*;

@Service
public class PostService {
    private PostRepository postRepository;
    private CommentRepository commentRepository;

    @Autowired
    public PostService(PostRepository postRepository, CommentRepository commentRepository) {
        this.postRepository = postRepository;
        this.commentRepository = commentRepository; // Initialize CommentRepository
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post getPostById(Long id) {
        return postRepository.findById(id).get();
    }

    public Post saveOrUpdatePost(Post post) {
        return postRepository.save(post);
    }

    public void deletePost(Long id) {
        postRepository.deleteById(id);
    }

    @Value("${file.upload-dir}")
    private String uploadDir;

    public String saveImage(MultipartFile file) throws IOException {

        File directory = new File(uploadDir);
        if (!directory.exists()) {
            directory.mkdirs();
        }
        String fileName = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
        Path filePath = Paths.get(uploadDir + fileName);
        Files.write(filePath, file.getBytes());

        return fileName;
    }


    // WITH COMMENTS HERE ************************************
    public Post getPostByIdWithComments(Long id) {
        Optional<Post> postOptional = postRepository.findById(id);
        return postOptional.map(post -> {
            Set<Comment> comments = new HashSet<>(commentRepository.findByPostId(post.getId()));
            post.setComments(comments);
            return post;
        }).orElse(null);
    }




}
