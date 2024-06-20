package com.example.pokerplanninpi.Repository;

import com.example.pokerplanninpi.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


import java.util.List;


@Repository
public interface CommentRepository extends JpaRepository<Comment,Long> {
    List<Comment> findByPostId(Long postId);


    List<Comment> findByParentCommentId(Long parentCommentId);
}
