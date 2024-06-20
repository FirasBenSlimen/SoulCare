package com.example.pokerplanninpi.Controller;

import com.example.pokerplanninpi.GlobalService.CommentService;
import com.example.pokerplanninpi.entity.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
@CrossOrigin(origins = "*")
public class CommentController {

    private final CommentService commentService;

    @Autowired
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @PostMapping("/add-comment/{postId}")
    public ResponseEntity<Comment> addComment(@PathVariable Long postId, @RequestBody String content) {
        Comment comment = commentService.addComment(postId, content);
        if (comment != null) {
            return new ResponseEntity<>(comment, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // Handle case where post with given ID is not found
        }
    }

    @GetMapping("/comments/{postId}")
    public ResponseEntity<List<Comment>> getCommentsByPostId(@PathVariable Long postId) {
        List<Comment> comments = commentService.getCommentsByPostId(postId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }

    @PutMapping("/comments/{commentId}")
    public ResponseEntity<Comment> updateComment(@PathVariable Long commentId, @RequestBody String content) {
        return commentService.updateComment(commentId, content);
    }

    @DeleteMapping("/comments/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.noContent().build();
    }

    // Add a reply to a comment
    @PostMapping("/comments/reply/{parentCommentId}")
    public ResponseEntity<Comment> addReply(@PathVariable Long parentCommentId,
                                            @RequestBody String content,
                                            @RequestParam Long postId) {
        Comment reply = commentService.addReply(parentCommentId, content, postId);
        if (reply != null) {
            return ResponseEntity.ok(reply);
        } else {
            return ResponseEntity.notFound().build(); // Or any appropriate response
        }
    }

    @GetMapping("/comments/reply/{parentCommentId}")
    public ResponseEntity<List<Comment>> getReplies(@PathVariable Long parentCommentId) {
        List<Comment> comments = commentService.getReplies(parentCommentId);
        return new ResponseEntity<>(comments, HttpStatus.OK);
    }


}