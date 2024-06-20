package com.example.pokerplanninpi.Repository;

import com.example.pokerplanninpi.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PostRepository  extends JpaRepository<Post,Long> {
}
