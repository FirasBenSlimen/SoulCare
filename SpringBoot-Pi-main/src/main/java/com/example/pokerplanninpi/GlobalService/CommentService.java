package com.example.pokerplanninpi.GlobalService;

import com.example.pokerplanninpi.Repository.CommentRepository;
import com.example.pokerplanninpi.Repository.PostRepository;
import com.example.pokerplanninpi.entity.Comment;
import com.example.pokerplanninpi.entity.Post;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    @Autowired
    public CommentService(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    /*public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }*/

    public List<Comment> getCommentsByPostId(Long postId) {
        return commentRepository.findByPostId(postId);
    }


    public Comment getCommentById(Long id) {
        Optional<Comment> comment = commentRepository.findById(id);
        return comment.orElse(null);
    }

    public Comment addComment(Long postId, String content) {
        Optional<Post> postOptional = postRepository.findById(postId);
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            Comment comment = new Comment();
            comment.setContent(content);
            comment.setDate(LocalDateTime.now());
            comment.setPost(post);
            return commentRepository.save(comment);
        }
        return null; // Handle case where post with given ID is not found
    }


    public ResponseEntity<Comment> updateComment(Long id, String content) {
        Optional<Comment> commentOptional = commentRepository.findById(id);
        if (commentOptional.isPresent()) {
            Comment comment = commentOptional.get();
            comment.setContent(content);
            //comment.setUser(new User(userId));
            comment.setDate(LocalDateTime.now());
            Comment updatedComment = commentRepository.save(comment);
            return ResponseEntity.ok(updatedComment);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public void deleteComment(Long id) {
        commentRepository.deleteById(id);
    }


    public Comment addReply(Long parentCommentId, String content, Long postId) //, Long userId
    {
        Comment parentComment = commentRepository.findById(parentCommentId)
                .orElseThrow(() -> new CustomEntityNotFoundException("Parent comment not found"));

        Post post = postRepository.findById(postId)
                .orElseThrow(() -> new CustomEntityNotFoundException("Post not found"));

        Comment reply = new Comment();
        reply.setContent(content);
        reply.setDate(LocalDateTime.now());
        reply.setPost(post);
        reply.setParentComment(parentComment);

        return commentRepository.save(reply);
    }

    public class CustomEntityNotFoundException extends RuntimeException {

        public CustomEntityNotFoundException(String message) {
            super(message);
        }
    }


    public List<Comment> getReplies(Long parentCommentId) {
        return commentRepository.findByParentCommentId(parentCommentId);
    }





}
